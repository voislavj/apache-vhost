var host   = location.hostname;
var port   = location.port;

function $escape(expression) {
    return expression.replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&');
}