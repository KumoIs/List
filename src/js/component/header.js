define(["jquery"], ($) => {
	class Header{
		constructor(){
			this.init();
			
		}
		init(){
			//加载header.html
			// $.get("/html/component/header.html",(data)=>{
            //     $("header").html(data);
			// })
			new Promise((resolve,reject)=>{
				$("header").load("/html/component/header.html", () => {
					resolve();
				})
			}).then(()=>{
				console.log('头部加载成功');
				this.register();
				this.fade();
				this.scrolltop();
			})
		}

		register(){
			$('.header_left_login').children().eq(3).on('click',function(){
				 parent.location.href = '/html/register.html';
			})
		}

		fade(){
			$(window).on('scroll',function(){
				if($(window).scrollTop() > $(window).height())
					$('.scroll_Top').fadeIn();
					else
					$('.scroll_Top').fadeOut();
			})
		}

		scrolltop(){
			$('.scroll_Top').on('click',backTop);
			function backTop(){
				$('html,body').animate({
					scrollTop:0
				},800);
			}
		}
		
    }
	return new Header();
})