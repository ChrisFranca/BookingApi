const http = require('http');
const { parse } = require('url');
const { pool } = require('./config/database');

class Server {
    constructor() {
        this.routes = new Map();
        this.middlewares = [];
    }

    /**
     * Adiciona uma rota ao servidor
     * @param {string} method - Método HTTP (GET, POST, PUT, DELETE, etc.)
     * @param {string} path - Caminho da rota
     * @param {Function} handler - Função que lida com a requisição
     */
    addRoute(method, path, handler) {
        const routeKey = `${method.toUpperCase()} ${path}`;
        this.routes.set(routeKey, handler);
    }

    /**
     * Adiciona um middleware ao servidor
     * @param {Function} middleware - Função de middleware
     */
    use(middleware) {
        this.middlewares.push(middleware);
    }

    /**
     * Inicializa o servidor
     * @param {number} port - Porta para o servidor escutar
     * @param {Function} callback - Função chamada quando o servidor inicia
     */
    start(port = 3000, callback) {
        const server = http.createServer(async (req, res) => {
            const { pathname } = parse(req.url, true);
            const method = req.method.toUpperCase();
            const routeKey = `${method} ${pathname}`;
            
            // Executa middlewares
            for (const middleware of this.middlewares) {
                await new Promise((resolve) => {
                    middleware(req, res, resolve);
                });
            }

            // Encontra e executa o handler da rota
            const handler = this.routes.get(routeKey);
            if (handler) {
                try {
                    await handler(req, res);
                } catch (error) {
                    this._handleError(res, error);
                }
            } else {
                this._notFound(res);
            }
        });

        server.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
            if (callback) callback();
        });
    }

    /**
     * Retorna erro 404 para rotas não encontradas
     */
    _notFound(res) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Rota não encontrada' }));
    }

    /**
     * Trata erros internos do servidor
     */
    _handleError(res, error) {
        console.error('Erro interno do servidor:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ 
            error: 'Erro interno do servidor',
            message: error.message 
        }));
    }
}

// Adiciona métodos auxiliares para facilitar a definição de rotas
['get', 'post', 'put', 'delete'].forEach(method => {
    Server.prototype[method] = function(path, handler) {
        this.addRoute(method.toUpperCase(), path, async (req, res) => {
            // Adiciona métodos úteis ao objeto de resposta
            res.json = (data, statusCode = 200) => {
                res.statusCode = statusCode;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
            };

            // Extrai parâmetros da URL e do corpo da requisição
            const { query } = parse(req.url, true);
            const params = { ...query };
            
            // Se for POST ou PUT, espera o corpo da requisição
            if (['POST', 'PUT'].includes(req.method)) {
                const body = await new Promise((resolve) => {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        try {
                            resolve(JSON.parse(data));
                        } catch {
                            resolve({});
                        }
                    });
                });
                Object.assign(params, body);
            }

            // Chama o handler com os parâmetros
            return handler({ ...req, params }, res);
        });
    };
});

// Exporta uma instância do servidor
module.exports = new Server();
