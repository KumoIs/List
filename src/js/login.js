require(["require-config"],()=>{
	require(['jquery','url','cookie','header','footer'],($,url)=>{
        
		class login{
            constructor(){
                $('#form_submit_btn').on('click',this.validation);
            }
        
            validation(){
                var _this = this;
                $.ajax({
                    url:url.baseUrlPhp+'/api/v1/login.php',
                    type:'post',
                    data:{
                        email:$('#email').val(),
                        password:$('#password').val()
                    },
                    success:function(res){
                        if(res.res_code){
                            //console.log(res.res_body.username);
                            if(!$('.remember')[0].checked){

                                $.cookie('usercookie',JSON.stringify({

                                        id:res.res_body.id,
                                        username:res.res_body.username,
                                        email:res.res_body.email

                                    }),{path:"/"});

                            }
                            else
                            {
                                $.cookie('usercookie',JSON.stringify({
                                        id:res.res_body.id,
                                        username:res.res_body.username,
                                        email:res.res_body.email
                                        }),
                                        {expires:7,path:"/"}       
                                    )
                            }
                            console.log('登录成功');
                            location.href='/index.html'
                        }else{
                            console.log('登录失败,密码错误或是不存在');
                        }
                    },
                    dataType:'json'
                })
            }
        }
    
        return new login();
    })  
})