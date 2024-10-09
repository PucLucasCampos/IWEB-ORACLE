import {Request, RequestHandler, Response} from "express";
// importação do Oraclo
import OracleDB  from "oracledb";

/*
    Nampespace que contém tudo sobre "contas de usuários"
*/
export namespace AccountsHandler {
    
    /**
     * Tipo UserAccount
     */
    export type UserAccount = {
        id: number | undefined;
        email:string;
        password:string;
        completeName: string;
    };

    // estudar .env ()
    // ():UserAccount
    async function login(email: string, password: string) {
        // Passo a Passo: 
            // Conectar no oracle.
            let conn = await OracleDB.getConnection({
                user: "BD130824258",
                password: "Docjk6",
                connectString: "BD-ACD/INTEGRADOR",
            });
            // Fazer o select para verificar se a conta existe.
            const result = await conn.execute(
                `SELECT *
                 FROM accounts
                 WHERE email = :email and password = :password`,
                [email, password] // email: primeira posição password: segunda posição
            );

            const linhas = result.rows;
            // if (linhas?.length === 0) {

            // }else {

            // }
            console.dir(linhas, {depth: null});

            // Pegar cada 

            // linhas?.forEach(l => {
            //     l
            // })

            await conn.close;
            // Se a conta existe, preencher o objeto conta.
            // Se não existe, devolver undefined.
            return;
    }

    export const loginHandler: RequestHandler = (req: Request, res: Response) => {
        const pEmail = req.get('email');
        const pPassword = req.get('password');
        if (pEmail && pPassword){
            const authData = login(pEmail, pPassword);
            if (authData !== undefined){
                // Tenho uma conta
                res.send("Login feito!");
            }
        }else {
            res.send("Parametros faltantes")
        }
    }

    /*
    /**
     * Função para tratar a rota HTTP /signUp. 
     * @param req Requisição http tratada pela classe @type { Request } do express
     * @param res Resposta http a ser enviada para o cliente @type { Response }
     */
    // export const createAccountRoute: RequestHandler = (req: Request, res: Response) => {
    //     // Passo 1 - Receber os parametros para criar a conta
    //     const pName = req.get('name');
    //     const pEmail = req.get('email');
    //     const pPassword = req.get('password');
    //     const pBirthdate = req.get('birthdate');
        
    //     if(pName && pEmail && pPassword && pBirthdate){
    //         // prosseguir com o cadastro... 
    //         const newAccount: UserAccount = {
    //             name: pName,
    //             email: pEmail, 
    //             password: pPassword,
    //         }
    //         const ID = saveNewAccount(newAccount);
    //         res.statusCode = 200; 
    //         res.send(`Nova conta adicionada. Código: ${ID}`);
    //     }else{
    //         res.statusCode = 400;
    //         res.send("Parâmetros inválidos ou faltantes.");
    //     }
    // }
}
