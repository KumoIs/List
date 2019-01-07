
define(["jquery"], ($) => {
	class footer{
		constructor(){
			this.init();
		}
		init(){
			//加载header.html
			// $.get("/html/component/header.html",(data)=>{
            //     $("header").html(data);
			// })
			new Promise((resolve,resject)=>{
				$("footer").load("/html/component/footer.html", () => {
					resolve();
				})
			}).then(()=>{
				console.log('尾部加载成功');
			})

        }
    }
	return new footer();
})