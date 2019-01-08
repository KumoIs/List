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
				this.clicks();
			})
		}

		register(){
			$('.header_left_login').children().eq(3).on('click',function(){
				 parent.location.href = '/html/register.html';
			})
			$('.header_left_login').children().eq(1).on('click',function(){
				parent.location.href = '/html/login.html';
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

		clicks(){
			$('.header_navigation').children().each(function(i){
				 $(this).on('click',function(){
					 location.href = '/html/list.html';
				 })
			})
		}
		
    }
	return new Header();
})