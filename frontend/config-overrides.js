const { alias } = require('react-app-rewire-alias')

module.exports = function override(config) {
	alias({
		'@Pages': 'src/pages',
		'@Components': 'src/components',
		'@Styles': 'src/styles',
		'@Context': 'src/context',
		'@Services': 'src/services',
		'@Utils': 'src/utils',
	})(config)

	return config
}
