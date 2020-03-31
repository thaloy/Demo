function createNode(tagString, props, children) {
	if (typeof tagString !== 'string')
		throw new TypeError(`html tag need a string`);
			
	if (!(props instanceof Object) && children)
		throw new TypeError(`props should be a object`);
		
	if (!children && (typeof props === 'number' || typeof props === 'string' || props instanceof HTMLElement)) {
		children = props;
		props = {};
	}	

	children = Array.isArray(children) ? children : !children ? [] : [children];

	// tagstring 可以是 div div.container div#contaienr div#container.box
	const tagReg = /[\.#].+$/;
	const idReg = /(^..+#(?=.)|\.[^#]+|^[^#]+$)/g;
	const classReg = /(^..+\.(?=.)|#[^\.]+|^[^\.]+$)/g;

	const tag = tagString.replace(tagReg, '');
	const id = tagString.replace(idReg, '');
	const className = tagString.replace(classReg, '');

	if (id) {
		props.id = id;
	}

	if (className) {
		props.class = className;
	}

	const element = document.createElement(tag);
	
	const propKeys = Object.keys(props);
	propKeys.forEach(propKey => {
		element.setAttribute(propKey, props[propKey]);
	});

	children.forEach(child => {
		if (child instanceof HTMLElement) {
			element.appendChild(child);
		} else {
			element.appendChild(document.createTextNode(child));
		}
	});

	return element;
}


