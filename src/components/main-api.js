import $ from '../plugs/jquery';
import '../plugs/swiper-3.4.0.min';
import '../plugs/validform';

/**
 * 一般轮播效果
 */

export function swiper() {
    new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        autoplay : 2000,
        loop:true,
        paginationClickable: true
    });
}

/**
 * 我的订单页面滑动事件
 */

export function tj_all_swiper() {
    var le = $('.tj_all_swiperContainer').length;
    if(le>0){//跳转到第几页
        var initialSlide = 0;
        var src = window.location.href.split('PTopage=')[1];
        if(src!=undefined){
            initialSlide = src
        }
        new Swiper('.tj_all_swiperContainer', {
            pagination: '.tj_all_pagination',
            paginationClickable: true,
            paginationBulletRender: function (swiper, index, className) {
                var indexName = '';
                if(index==0){
                    indexName = '进行中'
                }else if(index==1){
                    indexName = '待评价'
                }else if(index==2){
                    indexName = '全部订单'
                }
                return '<li class="' + className + '">' + indexName + '</li>';
            },initialSlide :initialSlide
        });
    }
}

/**
 * 账户类型选择
 */

export function choType() {
    //单选
    $('.chooseCodeLei li,.popupTimeCho .le li,.OneChoose li').click(function(){
        var _this = $(this);
        var _has = $(this).hasClass('active');
        if(!_has){
            _this.addClass('active').siblings().removeClass('active');
        }
    });
    //多选
    $('.chooseBstype2 li,.AllChoose li').click(function(){
        var _this = $(this);
        var _has = $(this).hasClass('active');
        if(!_has){
            _this.addClass('active');
        }else{
            _this.removeClass('active');
        }
    });
    //星星选择
    $('.StarColClick li').click(function(){
        var _this = $(this);
        var _has = $(this).hasClass('active');
        if(!_has){
            _this.addClass('active').prevAll().addClass('active');
        }else{
            _this.addClass('active').nextAll().removeClass('active');
        }
    });
    //服务地址操作
    $('.addressDel').click(function(e){
        e.stopPropagation();
        var _this = $(this);
        _this.parents("li").remove();
    });
}

/**
 * 表单验证
 */

export function valCheck() {
    var veForm = $(".registerform");
    if(veForm.length>0){
        veForm.Validform({
            datatype:{
                "nl": /^.{1,30}$/,//不能为空且为30字符
                "n": /^.{1,500}$/,//不能为空
                "address": /^.{2,100}$/,//不能为空且为30字符
                "phone":/^[1][0-9]{10}/,//手机号
                "code":/^(^\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$///身份证
            },
            beforeSubmit:function(){
                window.location.href='/My/message';
                return false;
            }
        });
        veForm.find('textarea,input').each(function(){
            var _this = $(this);
            var check =_this.attr('datatype');
            if(check){
                _this.on('keyup paste', function() {
                    var i = 0;
                    veForm.find('textarea,input').each(function(){
                        var _this = $(this);
                        var check =_this.attr('datatype');
                        if(check){
                            var val = _this.val();
                            if(val=='') {
                                i++;
                            }
                            if(i>0){
                                $("[type='submit']").addClass('body-back-6');
                            }else{
                                $("[type='submit']").removeClass('body-back-6');
                            }
                        }
                    });
                });
            }
        });
        $('#Validform_msg .iframe').html('<a class="Validform_close" href="javascript:void(0);">确定</a>');
        $('.Validform_close').click(function(){
            $('#Validform_msg').fadeOut(100);
        });
    }
}