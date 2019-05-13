const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors')
import {User} from './db'
const graphqlHTTP = require('koa-graphql');
const mount = require('koa-mount');
import {UserListQuery, UserQuery} from './graphql/schema'
const app = new Koa();
app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));
app.use(bodyParser());  // 解析request的body

const router = require('koa-router')()
router.get('/', async (ctx, next) => {
    const data = await User.find()
	console.log('data', data)
    ctx.response.body = data
})

app.use(mount('/graphql', graphqlHTTP({
    schema: UserQuery,
    // graphiql: true
})))

// app.use(mount('/userlist', graphqlHTTP({
//     schema: UserListQuery,
//     graphiql: true
// })))

app.use(router.routes());
app.listen(9000);
console.log('app started at port 9000...')
