import express, { Router } from 'express'
import path from 'path'

interface Options {
    port: number;
    routes:Router;
    public_path: string;
}

export class Server {
    
    private app = express()
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options:Options ){
        const {port,routes , public_path = 'public'} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start(){

        //* Middelwares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        //* Public Folder
        this.app.use(express.static(this.publicPath))

        //* Routes
        this.app.use(this.routes);

        //* SPA
        this.app.get('/{*splat}',(req,res)=>{
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        })
        
        this.app.listen(this.port,() => {
            console.log(`running on port ${this.port}`);
        })

    }
}
