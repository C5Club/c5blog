/**
 * 给所有的 Model 扩展功能
 * Created by maocg.
 * Date:2015/11/19.
 * Time:23:28.
 */
var tools = require('../config/tools');

module.exports = function (schema) {
    schema.methods.create_at_ago = function () {
        return tools.formatDate(this.create_at, true);
    };

    schema.methods.updated_at_ago = function () {
        return tools.formatDate(this.create_at, true);
    };
};
