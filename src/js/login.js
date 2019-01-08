require(["require-config"],()=>{
	require(['jquery','url','cookie','header','footer'],($,url)=>{
        console.log(url);
		class login{
            constructor(){
                $('#form_submit_btn').on('click',this.validation);
            }
        
            validation(){
                $.ajax({
                    url:url.baseUrlPhp+'/api/v1/login.php',
                    type:'post',
                    data:{
                        email:$('#email').val(),
                        password:$('#password').val()
                    },
                    success:function(res){
                        if(res.res_code){
                            
                            if(!$('.remember')[0].checked){
                                $.cookie('usercookie',JSON.stringify({
                                    id:res.res_body.id,
                                    name:res.res_body.email})
                                );

                            }else{
                                
                                $.cookie('usercookie',JSON.stringify({
                                        id:res.res_body.id,
                                        name:res.res_body.email}),
                                {expires:3});
                              
                            }
                            console.log('登录成功');
                            //console.log(JSON.parse(cookie)); 
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