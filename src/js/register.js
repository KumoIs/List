
require(["require-config"],()=>{
	require(['jquery','url','header','footer'],($,url)=>{
		
		class register{
			constructor(){
				this.init();
			}
			init(){
				$("#regBtn").on("click",$.proxy(this.ifvalidation,this))
			}

			ifvalidation(e){
				e.preventDefault();
				  var name = $('#surnname').val();
				  if(!name==null){
					console.log('必填');
				  }
				  //设置手机号输入正则
				  var telreg = /^1[34578]\d{9}$/;
				  // 获取用户输入的手机号
				  var phonenumber = $("#phonenumber").val();
				  if(!telreg.test(phonenumber)){
					console.log("您输入的手机号格式有误")
				  }
				  
				  //设置密码输入正则
				//   var reg1 = /[!@#$%^&*()_?<>{}]{1}/;
				//   var reg2 = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,18}/;
				//   var reg3 = /[a-zA-Z]+/;
				//   var reg4 = /[0-9]+/;
				  let pass = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){6,}$/;
				  //获取用户输入的密码
				  var password = $("#password").val();
				  if(!pass.test(password)){
					console.log("该密码不符合密码政策，请输入一个 7 个字符长度的密码，且该密码中包含至少一个数字和一个大写字母");
				  }
				  //获取用户再次输入的密码
				  var conpassword = $("#conpassword").val();
				  //判断用户俩次输入的密码是否一致
				  if(password!==conpassword){
					console.log("俩次密码输入不一致，请重新输入")
				  }
				  
				  let email =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
				  let emailval = $('#email').val();
				  let conemailval = $('#conemail').val();
				  if(!email.test(emailval)){
					console.log('邮箱格式不对');
				  }
				  if(emailval!==conemailval){
					console.log("两次邮箱不一致，请重新输入")
				}
				  // 判断用户协议是否为勾选状态
				  // if(!$("input[type='checkbox']").is(':checked')){
					//   alert("请同意用户协议后再试")
				  // }
				  //当满足所有条件的时候将用户信息存入数据库，跳转至登陆页面
				 if(telreg.test(phonenumber) &&pass.test(password)&&password==conpassword&&email.test(emailval)&&emailval==conemailval){
					this.validation();
					console.log('注册成功');
					location.href = '/html/login.html'
				  }else{
					  
					  console.log('注册失败');
				  }
			}
			
			validation(e){
				//console.log(e)
				//e = event || window.event;
				// e.preventDefault();
				let surnnames = $('#name').val()+$('#surnname').val();
				$.ajax({
					url: url.baseUrlPhp+"/api/v1/register.php",
					type: "post",
					data: {
						username: surnnames,
						email: $("#email").val(),
						password: $("#password").val()
					},
					success: function(res){
						console.log(res);
						if(res.res_code){
							console.log("注册成功");
							//location.href = "/html/index.html";
						}else{
							console.log('用户名已存');
						}
					},
					dataType: "json"
				})
			}
		}
		return new register();
	})
	
})