define(["jquery",'template','url',"cookie"], ($,template,url) => {
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
				this.register().cookietrue();
				this.quit();
				new scrollt();

			})
		}

		//事件合集
		register(){
			let _this = this;
			//登录按钮
			$('.header_left_login').children().eq(3).on('click',function(){
				 parent.location.href = '/html/register.html';
			})
			//注册按钮
			$('.header_left_login').children().eq(1).on('click',function(){
				parent.location.href = '/html/login.html';
			   })
			//移入登录时
			$('.header_a_left').on('mouseenter',function(){
				if($.cookie('usercookie')){
					console.log('有');
					$('.header_left_login_z').css({'display':'block'});

				}else{

					console.log('无');
					$('.header_left_login').css({'display':'block'});
				}
			})
			//移出登录时
			$('.header_div_left').on('mouseleave',function(){
				if($.cookie('usercookie')){
					
					$('.header_left_login_z').css({'display':'none'});
					
				}else{
					$('.header_left_login').css({'display':'none'});
				}
			})
			//移入导航栏
			$('.header_navigation').children().on('mouseenter',function(){
			//偷懒式 分类导航
				var index = $(this).index();
				if(index<2){
					index = 2
				}else{
					index = 1
				}
				$('.header_class_nav_warp').css({'display':'block'});
				_this.navclass(index);
			})
			//导航栏 1 2不用显示二级当行
			$('.header_navigation').children().eq(0).off('mouseenter');
			$('.header_navigation').children().eq(1).off('mouseenter');
			//移出导航栏
			$('.header_navigation').children().on('mouseleave',function(){

				$('.header_class_nav_warp').css({'display':'none'});
				
			})
			$('.lenovoinput').on('input',$.proxy(this.suggest,this))
			$('.lenovoinput').on('blur',function(){
				$('.lenoveselect').css({'display':'none'});
			})
			return this;
		}

		//cookie操作
		cookietrue(){
			if($.cookie('usercookie')){
				let res = JSON.parse($.cookie('usercookie'));
				$('.header_a_centre').css({'display':'none'});
				$('.header_centre_text').html('我的账户');
				$('.header_left_login_username').html(res.username);
			}else{
				$('.header_a_centre').css({'display':'block'});
			}
			return this;
		}

		//登出
		quit(){
			$('#header_quitBtn').on('click',function(){
				$.cookie('usercookie','',{expires:-1,path:"/"});
				location.reload();
			})
		}

		//偷懒式导航栏
		navclass(index){
			//调用接口以此类推\
			$.get(url.baseUrlRap+'/nav_col'+index,(data)=>{
				let html = template('navitem',{nav_item:data.res_body.data});
				$('.header_class_ul').html(html);
			})
		}

		suggest(event){
			var inputval =  $(event.target).val();
			console.log(inputval);
			let url = `https://suggest.taobao.com/sug?code=utf-8&q=${inputval}&callback=?`;
			$.getJSON(url,(data)=>{
				let html = '';
				console.log(data.result);
				data.result.forEach((curr)=>{
					html += `<p class='p_lenove'>${curr[0]}</p>`;
					
				})
				$(".lenoveselect").show().html(html);
			})

			this.lenovebtns();
		}
		
		lenovebtns(){
			var children = $('.lenoveselect').children();
			$('.lenoveselect').on('click',children,function(){
				console.log('123');
			})
		}
		
	}
	
	class scrollt{
		constructor() {
			this.fade().scrolltop().clicks();
		}

		fade(){
			$('client').on('scroll',function(){
				if($('client').scrollTop() > $('client').height())
					$('.scroll_Top').fadeIn();
					else
					$('.scroll_Top').fadeOut();
			})
			return this;
		}

		scrolltop(){
			$('.scroll_Top').on('click',backTop);
			function backTop(){
				$('html,body').animate({
					scrollTop:0
				},800);
			}
			return this;
		}

		clicks(){
			$('.header_navigation').children().each(function(i){
				 $(this).on('click',function(){
					 location.href = '/html/list.html';
				 })
			})
			return this;
		}
	}
	return new Header();
})