/**
	* @desc 验证层叠上下文的独立性
	* @author thalo
	* @date 2020-04-01
	*/

(function() {
	const wrap = createNode("div", {}, [
		createNode("p", {}, "👇的例子是验证层叠上下文相互独立"),
		createNode("div", { class: "firstStackingContext" }, [
			createNode("div", { class: "firstChild" }, "这是一个例子")
		]),
		createNode("div", { class: "secondStackingContext" }, [
			createNode("div", { class: "secondChild" })
		]),
		createNode("style", {}, `
			.firstStackingContext {
				position: relative;
				z-index: 10;
				width: 100px;
				height: 100px;
				background-color: red;
				border: 10px solid black;
			}

			.firstStackingContext .firstChild {
				position: absolute;
				top: 50px;
				z-index: 20;
				width: 50px;
				height: 50px;
				background-color: yellow;
			}

			.secondStackingContext {
				position: relative;
				z-index: -1;
				top: -50px;
				width: 200px;
				height: 200px;
				background-color: blue;
				border: 10px solid green;
			}

			.secondStackingContext .secondChild {
				position: absolute;
				z-index: 100;
				width: 150px;
				height: 150px;
				background-color: #FFF;
			}
		`),
		createNode("pre", {}, [
			"👆的例子中\n",
			"已知黑色边框的元素层级顺序比绿色边框的元素高\n",
			"即使白色元素z-index为100大于黑色边框的元素z-index为10,也大于黄色颜色z-index为20\n",
			"白色元素依旧被覆盖,因为其父元素产生了层叠上下文相互独立,其父元素的层级低\n"
		])
	]);

	document.body.appendChild(wrap);
}());
