const connection = require('../connection');

module.exports = async (request, response) => {
    const data = request.usuario;
    
    
    const query = `DELETE a.*, b.*
    FROM users a 
    LEFT JOIN favoritos b 
    ON b.idUser = a.id 
    WHERE a.id = ${data.id}`;
    
    const dados = await connection.awaitQuery(query)
    //console.log(dados)
    // let teste = await connection.awaitQuery(`DELETE a., b. 
    // FROM users a 
    // LEFT JOIN favoritos b 
    // ON b.idUser = a.id 
    // WHERE a.id = ${data.id}`)
    response.status(200).json({menssagem: 'Usuário deletado com sucesso'});

}
