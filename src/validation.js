window.subscribe = function () {
	return {
		email: '',
		validation: {
			email: {
				rule: {
					required: function(field){
						if (field) {
							return { invalid: false, message: '' }
						} else {
							return { invalid: true, message: 'Email cannot be empty' }
						}
					},
					email: function (field) {
						const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
						if (validEmailRegex.test(field)) {
							return { invalid: false, message: '' }
						} else {
							return { invalid: true, message: 'Please provide a valid email address' }
						}
					}
				}
			},
		},
		validate(field) {
			for (const key in this.validation[field].rule) {
				const validationResult = this.validation[field].rule[key](this[field])
				if (validationResult.invalid) {
					this.validation[field].invalid = true
					this.validation[field].message = validationResult.message
					break
				}
				this.validation[field].invalid = false
				this.validation[field].message = ''
			}
		},
		submit() {
			this.validate('email')
		}
	}
}