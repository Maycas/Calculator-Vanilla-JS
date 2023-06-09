class Display {
    constructor() {
        this._html = this.createNode('display')
        this._enabled = true
        
        this.onKeyboardPressedCallback = null
    }

    createNode(containerId) {
        const node = document.createElement('input')
        node.setAttribute('id', containerId)
        node.setAttribute('type', 'text')

        node.addEventListener('keyup', this.onKeyboardPressed.bind(this))
        node.addEventListener('keydown', this.onKeyboardDisabled.bind(this))
        node.addEventListener('keydown', this.preventWrongCharacters.bind(this))
    
        return node
    }

    get html() {
        return this._html
    }

    get value() {
        return this._html.value
    }

    get enabled() {
        return this._enabled
    }

    set value(value) {
        this._html.value = value
    }

    set enabled(value) {
        this._enabled = value
    }

    onKeyboardDisabled(event){
        if(!this.enabled) {
            event.preventDefault()
        }
    }

    onKeyboardPressed(event) {
        if(this.enabled) {
            if(this.onKeyboardPressedCallback) {
                this.onKeyboardPressedCallback(event, this.value)
            }
        } else {
            event.preventDefault()
        }
    }

    preventWrongCharacters(event) {
        // Control input of only numbers and math symbols
        const allowedKeys = [
            8, // backspace
            37, 38, 39, 40, // arrow keys
            48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // digits 0-9
            107, 109, 106, 111, 221, 189, 187, // plus, minus, multiply, divide
            190, // decimal point
            40, 41 // opening and closing parenthesis
        ];

        const notAllowedKey = !allowedKeys.includes(event.keyCode)
        const isEqualSign = (event.key == '=')
        const isRefreshKey = ((event.metaKey || event.ctrlKey) && event.keyCode === 82) 
        
        if((isEqualSign || notAllowedKey) && !isRefreshKey) {
            event.preventDefault()
        }
    }
}