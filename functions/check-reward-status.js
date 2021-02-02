/*

*/

exports.handler = async (...args) => {
  console.log(args);

  return {
    statusCode: 200,
    body: 'ok',
  };
};
