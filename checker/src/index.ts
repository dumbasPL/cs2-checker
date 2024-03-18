import { Checker } from './checker';

// empty acc
// const refreshToken = 'eyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInN0ZWFtIiwgInN1YiI6ICI3NjU2MTE5OTY1MTkyMzM4OSIsICJhdWQiOiBbICJjbGllbnQiLCAid2ViIiwgInJlbmV3IiwgImRlcml2ZSIgXSwgImV4cCI6IDE3MjgwNTg5OTksICJuYmYiOiAxNzAxMjk5NjkxLCAiaWF0IjogMTcwOTkzOTY5MSwgImp0aSI6ICIwRUNDXzI0MTE0Q0VFXzQ4QTg0IiwgIm9hdCI6IDE3MDk5Mzk2OTEsICJwZXIiOiAxLCAiaXBfc3ViamVjdCI6ICI1Mi4yMzMuMTg3LjEzOCIsICJpcF9jb25maXJtZXIiOiAiNTIuMjMzLjE4Ny4xMzgiIH0.2dJKCsaGlQe7zZdHa67rNEtJ7LNUiaDyfsYn3cT5RQimWglwVShdmD0xC6NLyfOJikJfTWcKZaUaPazqVcl8BA';

// premier
const refreshToken = 'eyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInN0ZWFtIiwgInN1YiI6ICI3NjU2MTE5OTE3NDAyNjE2OCIsICJhdWQiOiBbICJjbGllbnQiLCAid2ViIiwgInJlbmV3IiwgImRlcml2ZSIgXSwgImV4cCI6IDE3MjgyMDk1NDUsICJuYmYiOiAxNzAxMzYzNzQ5LCAiaWF0IjogMTcxMDAwMzc0OSwgImp0aSI6ICIwRUM2XzI0MTE0RDAwXzVGRjY3IiwgIm9hdCI6IDE3MTAwMDM3NDksICJwZXIiOiAxLCAiaXBfc3ViamVjdCI6ICI4My4yMzAuNDAuMjAxIiwgImlwX2NvbmZpcm1lciI6ICI4My4yMzAuNDAuMjAxIiB9.QsCu9H0XH22eXMO7SpOOdt-Z-HWChAMNxOXVaoxsHDQFOWGG8BL7XA46ZFfQdfsgnHcL2sHuvjfXu6TiajKvBg';

const checker = new Checker();
checker.on('log', (message) => console.log(message));
// checker.on('debug', (error) => console.debug(error));
checker.run(refreshToken).then((response) => {
  console.dir(response, { depth: null });
});

// re-export the checker
export { Checker, IAccountData } from './checker';