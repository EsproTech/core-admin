import path from "path";

const BASE_MODULES_URL = [
	path.join(__dirname,'../base/models'),
	path.join(__dirname,'../human_capital/models'),
	path.join(__dirname,'../sale/models'),
	path.join(__dirname,'../stock/models')
]

module.exports = BASE_MODULES_URL;