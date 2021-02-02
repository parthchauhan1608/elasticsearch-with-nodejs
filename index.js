const es = require('elasticsearch');
const esClient  = new es.Client({
    host: 'localhost:9200',
    log: 'trace'
});


function createIndices(){
    esClient.indices.create({
        index: 'blog'
    })
    .then((r)=>{
        console.log(r);
    })
    .catch((e)=>{
        console.log({ e })
    });
}

function updateMapping(){
    esClient.indices.putMapping({
        index : 'blog',
        // type: 'ciphertrick',
        body : {
            properties: {
                title: {
                    type: "text"
                },
                tags: {
                    type: "keyword"
                },
                body: {
                    type: "text"
                }
            }
        },
        include_type_name: true
    })
    .then((r)=>{
        console.log(r);
    })
    .catch((e)=>{
        console.log({ e });
    });
}

function insertDocs(){
    esClient.index({
        index: 'blog',
        // type: 'ciphertrick',
        body: {
            title: "Learn elastic search",
            tags: ['NodeJS', 'Programming'],
            body: `Lot of content here...
                    .... article`
        }
    })
    .then((r)=>{
        console.log(r);
    })
    .catch((e)=>{
        console.log({ e });
    });

    // esClient.create({   //here we need to specify id 
    //     index: 'blog',
    //     type: 'ciphertrick',
    //     id:1,
    //     body: {
    //         title: "Learn elastic search",
    //         tags: ['NodeJS', 'Programming'],
    //         body: `Lot of content here...
    //                 .... article`
    //     }
    // })
    // .then((r)=>{
    //     console.log(r);
    // })
    // .catch((e)=>{
    //     console.log({ e });
    // });
}

function searchDoc(){
    esClient.search({
        index: 'blog',
        q: '*l*'
        // type: 'ciphertrick',
        // body: {
        //     query: {
        //         match: {
        //             "title": "Learn"
        //         }
        //     }
        // }
    })
    .then((r)=>{
        console.log(r.hits.hits);
    })
    .catch((e)=>{
        console.log({ e });
    });
}

function searchDocAggregate(){
    esClient.search({
        index: 'blog',
        // type: 'ciphertrick',
        body: {
            query: {
                match: {
                    "title": "Learn"
                }
            },
            aggs: {
                tags: {
                    terms: {
                        field: 'tags'
                    }
                }
            }
        }
    })
    .then((r)=>{
        console.log(r);
    })
    .catch((e)=>{
        console.log({ e });
    });
}

function countDocs(){
    esClient.count({
        index: 'blog',
        body: {}
    })
    .then((r)=>{
        console.log(r);
    })
    .catch((e)=>{
        console.log({ e });
    });
}

function deleteDocById(){
    esClient.delete({
        index:'blog',
        id:'x1wVgnEBeP0Ivtna3Jxe'
    })
    .then((r)=>{
        console.log(r);
    })
    .catch((e)=>{
        console.log({ e });
    })
}

function deleteDocByQuery(){
    esClient.deleteByQuery({
        index: 'blog',
        type: 'ciphertrick',
        size: 1,
        body: {
            query: {
                match: {
                    title: "Learn"
                }
            } 
        }
    })
    .then((r)=>{
        console.log(r);
    })
    .catch((e)=>{
        console.log({ e });
    });
}

function explain(){
    esClient.explain({
        index: 'blog',
        id: 'y1xSgnEBeP0IvtnaiJw7',
        body:{
            query: {
                match:{
                    title: 'learn'
                }
            }
        }
    })
    .then((r)=>{
        console.log(r.explanation.details);
    })
    .catch((e)=>{
        console.log({ e });
    });  
}

function getDocById(){
    esClient.get({
        index:'blog',
        id: 'y1xSgnEBeP0IvtnaiJw7'
    })
    .then((r)=>{
        console.log(r);
    })
    .catch((e)=>{
        console.log({ e });
    })
}

function updateOne(){
    esClient.update({
        index: 'blog',
        id: 'y1xSgnEBeP0IvtnaiJw7',
        body: {
            doc:{
                title: 'try'
            }
        }
        
    })
    .then((r)=>{
        console.log(r);
    })
    .catch((e)=>{
        console.log({ e });
    })
}

function updateByQuery(){
    esClient.updateByQuery({
        index : 'blog',
        body:{
            query:{
                match:{
                    title: 'try'
                }
            },
            script:{
                inline: "ctx._source.title = 'Learn elastic search'" 
            }
        }
    })
    .then((r)=>{
        console.log(r);
    })
    .catch((e)=>{
        console.log({ e });
    });
}

// createIndices();
// updateMapping();
// insertDocs();
// searchDoc();
// searchDocAggregate();
// countDocs();
// deleteDocById();
// deleteDocByQuery();
// explain();
// getDocById();
// updateOne();
// updateByQuery();