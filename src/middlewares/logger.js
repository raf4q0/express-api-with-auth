import morgan from 'morgan';

// const morganMiddleware = morgan('dev');
const morganMiddleware = morgan(':method :url :status - :response-time ms | :remote-addr - :user-agent ')

export default morganMiddleware;
