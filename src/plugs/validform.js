import jQuery from '../plugs/jquery';
!function (t, i, e) {
    function a(i, e) {
        var a = (t(window).width() - i.outerWidth()) / 2, r = (t(window).height() - i.outerHeight()) / 2, r = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + (r > 0 ? r : 0);
        i.css({left: a}).animate({top: r}, {duration: e, queue: !1})
    }

    function r() {
        return 0 !== t("#Validform_msg").length ? !1 : (n = t('<div id="Validform_msg"><div class="Validform_title">' + o.tit + '<a class="Validform_close" href="javascript:void(0);">&chi;</a></div><div class="Validform_info"></div><div class="iframe"><iframe frameborder="0" scrolling="no" height="100%" width="100%"></iframe></div></div>').appendTo("body"), n.find("a.Validform_close").click(function () {
            return n.hide(), l = !0, s && s.focus().addClass("Validform_error"), !1
        }).focus(function () {
            this.blur()
        }), void t(window).bind("scroll resize", function () {
            !l && a(n, 400)
        }))
    }

    var s = null, n = null, l = !0, o = {
        tit: "提示信息",
        w: {
            "*": "不能为空！",
            "*6-16": "请填写6到16位任意字符！",
            n: "请填写数字！",
            "n6-16": "请填写6到16位数字！",
            s: "不能输入特殊字符！",
            "s6-18": "请填写6到18位字符！",
            p: "请填写邮政编码！",
            m: "请填写手机号码！",
            e: "邮箱地址格式不对！",
            url: "请填写网址！"
        },
        def: "请填写正确信息！",
        undef: "datatype未定义！",
        reck: "两次输入的内容不一致！",
        r: "通过信息验证！",
        c: "正在检测信息…",
        s: "请{填写|选择}{0|信息}！",
        v: "所填信息没有经过验证，请稍后…",
        p: "正在提交数据…"
    };
    t.Tipmsg = o;
    var c = function (i, a, s) {
        var a = t.extend({}, c.defaults, a);
        a.datatype && t.extend(c.util.dataType, a.datatype);
        var n = this;
        return n.tipmsg = {w: {}}, n.forms = i, n.objects = [], s === !0 ? !1 : (i.each(function () {
            if ("inited" == this.validform_inited)return !0;
            this.validform_inited = "inited";
            var i = this;
            i.settings = t.extend({}, a);
            var r = t(i);
            i.validform_status = "normal", r.data("tipmsg", n.tipmsg), r.delegate("[datatype]", "blur", function () {
                var t = arguments[1];
                c.util.check.call(this, r, t)
            }), r.delegate(":text", "keypress", function (t) {
                13 == t.keyCode && 0 == r.find(":submit").length && r.submit()
            }), c.util.enhance.call(r, i.settings.tiptype, i.settings.usePlugin, i.settings.tipSweep), i.settings.btnSubmit && r.find(i.settings.btnSubmit).bind("click", function () {
                return r.trigger("submit"), !1
            }), r.submit(function () {
                var t = c.util.submitForm.call(r, i.settings);
                return t === e && (t = !0), t
            }), r.find("[type='reset']").add(r.find(i.settings.btnReset)).bind("click", function () {
                c.util.resetForm.call(r)
            })
        }), void((1 == a.tiptype || (2 == a.tiptype || 3 == a.tiptype) && a.ajaxPost) && r()))
    };
    c.defaults = {
        tiptype: 1,
        tipSweep: !1,
        showAllError: !1,
        postonce: !1,
        ajaxPost: !1
    }, c.util = {
        dataType: {
            "*": /[\w\W]+/,
            "*6-16": /^[\w\W]{6,16}$/,
            n: /^\d+$/,
            "n6-16": /^\d{6,16}$/,
            s: /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
            "s6-18": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
            p: /^[0-9]{6}$/,
            m: /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
            e: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            url: /^(\w+:\/\/)?\w+(\.\w+)+.*$/
        }, toString: Object.prototype.toString, isEmpty: function (i) {
            return "" === i || i === t.trim(this.attr("tip"))
        }, getValue: function (i) {
            var a, r = this;
            return i.is(":radio") ? (a = r.find(":radio[name='" + i.attr("name") + "']:checked").val(), a = a === e ? "" : a) : i.is(":checkbox") ? (a = "", r.find(":checkbox[name='" + i.attr("name") + "']:checked").each(function () {
                a += t(this).val() + ","
            }), a = a === e ? "" : a) : a = i.val(), a = t.trim(a), c.util.isEmpty.call(i, a) ? "" : a
        }, enhance: function (i, e, a, r) {
            var s = this;
            s.find("[datatype]").each(function () {
                2 == i ? 0 == t(this).parent().next().find(".Validform_checktip").length && (t(this).parent().next().append("<span class='Validform_checktip' />"), t(this).siblings(".Validform_checktip").remove()) : (3 == i || 4 == i) && 0 == t(this).siblings(".Validform_checktip").length && (t(this).parent().append("<span class='Validform_checktip' />"), t(this).parent().next().find(".Validform_checktip").remove())
            }), s.find("input[data-recheck]").each(function () {
                if ("inited" == this.validform_inited)return !0;
                this.validform_inited = "inited";
                var i = t(this), e = s.find("input[name='" + t(this).attr("data-recheck") + "']");
                e.bind("keyup", function () {
                    if (e.val() == i.val() && "" != e.val()) {
                        if (e.attr("tip") && e.attr("tip") == e.val())return !1;
                        i.trigger("blur")
                    }
                }).bind("blur", function () {
                    if (e.val() != i.val() && "" != i.val()) {
                        if (i.attr("tip") && i.attr("tip") == i.val())return !1;
                        i.trigger("blur")
                    }
                })
            }), s.find("[tip]").each(function () {
                if ("inited" == this.validform_inited)return !0;
                this.validform_inited = "inited";
                var i = t(this).attr("tip"), e = t(this).attr("altercss");
                t(this).focus(function () {
                    t(this).val() == i && (t(this).val(""), e && t(this).removeClass(e))
                }).blur(function () {
                    "" === t.trim(t(this).val()) && (t(this).val(i), e && t(this).addClass(e))
                })
            }), s.find(":checkbox[datatype],:radio[datatype]").each(function () {
                if ("inited" == this.validform_inited)return !0;
                this.validform_inited = "inited";
                var i = t(this), e = i.attr("name");
                s.find("[name='" + e + "']").filter(":checkbox,:radio").bind("click", function () {
                    setTimeout(function () {
                        i.trigger("blur")
                    }, 0)
                })
            }), s.find("select[datatype][multiple]").bind("click", function () {
                var i = t(this);
                setTimeout(function () {
                    i.trigger("blur")
                }, 0)
            }), c.util.usePlugin.call(s, e, i, a, r)
        }, usePlugin: function (i, e, a, r) {
            var s = this, i = i || {};
            if (s.find("input[plugin='swfupload']").length && "undefined" != typeof swfuploadhandler) {
                var n = {
                    custom_settings: {
                        form: s, showmsg: function (t, i) {
                            c.util.showmsg.call(s, t, e, {obj: s.find("input[plugin='swfupload']"), type: i, sweep: a})
                        }
                    }
                };
                n = t.extend(!0, {}, i.swfupload, n), s.find("input[plugin='swfupload']").each(function (i) {
                    return "inited" == this.validform_inited ? !0 : (this.validform_inited = "inited", t(this).val(""), void swfuploadhandler.init(n, i))
                })
            }
            if (s.find("input[plugin='datepicker']").length && t.fn.datePicker && (i.datepicker = i.datepicker || {}, i.datepicker.format && (Date.format = i.datepicker.format, delete i.datepicker.format), i.datepicker.firstDayOfWeek && (Date.firstDayOfWeek = i.datepicker.firstDayOfWeek, delete i.datepicker.firstDayOfWeek), s.find("input[plugin='datepicker']").each(function () {
                    return "inited" == this.validform_inited ? !0 : (this.validform_inited = "inited", i.datepicker.callback && t(this).bind("dateSelected", function () {
                        var e = new Date(t.event._dpCache[this._dpId].getSelected()[0]).asString(Date.format);
                        i.datepicker.callback(e, this)
                    }), void t(this).datePicker(i.datepicker))
                })), s.find("input[plugin*='passwordStrength']").length && t.fn.passwordStrength && (i.passwordstrength = i.passwordstrength || {}, i.passwordstrength.showmsg = function (t, i, r) {
                    c.util.showmsg.call(s, i, e, {obj: t, type: r, sweep: a})
                }, s.find("input[plugin='passwordStrength']").each(function () {
                    return "inited" == this.validform_inited ? !0 : (this.validform_inited = "inited", void t(this).passwordStrength(i.passwordstrength))
                })), "addRule" != r && i.jqtransform && t.fn.jqTransSelect) {
                if ("true" == s[0].jqTransSelected)return;
                s[0].jqTransSelected = "true";
                var l = function (i) {
                    var e = t(".jqTransformSelectWrapper ul:visible");
                    e.each(function () {
                        var e = t(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);
                        i && e.oLabel && e.oLabel.get(0) == i.get(0) || t(this).hide()
                    })
                }, o = function (i) {
                    0 === t(i.target).parents(".jqTransformSelectWrapper").length && l(t(i.target))
                }, d = function () {
                    t(document).mousedown(o)
                };
                i.jqtransform.selector ? (s.find(i.jqtransform.selector).filter('input:submit, input:reset, input[type="button"]').jqTransInputButton(), s.find(i.jqtransform.selector).filter("input:text, input:password").jqTransInputText(), s.find(i.jqtransform.selector).filter("input:checkbox").jqTransCheckBox(), s.find(i.jqtransform.selector).filter("input:radio").jqTransRadio(), s.find(i.jqtransform.selector).filter("textarea").jqTransTextarea(), s.find(i.jqtransform.selector).filter("select").length > 0 && (s.find(i.jqtransform.selector).filter("select").jqTransSelect(), d())) : s.jqTransform(), s.find(".jqTransformSelectWrapper").find("li a").click(function () {
                    t(this).parents(".jqTransformSelectWrapper").find("select").trigger("blur")
                })
            }
        }, getNullmsg: function (t) {
            var i, e = this, a = /[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z\s]+/g, r = t[0].settings.label || ".Validform_label";
            if (r = e.siblings(r).eq(0).text() || e.siblings().find(r).eq(0).text() || e.parent().siblings(r).eq(0).text() || e.parent().siblings().find(r).eq(0).text(), r = r.replace(/\s(?![a-zA-Z])/g, "").match(a), r = r ? r.join("") : [""], a = /\{(.+)\|(.+)\}/, i = t.data("tipmsg").s || o.s, "" != r) {
                if (i = i.replace(/\{0\|(.+)\}/, r), e.attr("data-recheck"))return i = i.replace(/\{(.+)\}/, ""), e.attr("data-nullmsg", i), i
            } else i = e.is(":checkbox,:radio,select") ? i.replace(/\{0\|(.+)\}/, "") : i.replace(/\{0\|(.+)\}/, "$1");
            return i = e.is(":checkbox,:radio,select") ? i.replace(a, "$2") : i.replace(a, "$1"), e.attr("data-nullmsg", i), i
        }, getErrormsg: function (i, e, a) {
            var r, s = /^(.+?)((\d+)-(\d+))?$/, n = /^(.+?)(\d+)-(\d+)$/, l = /(.*?)\d+(.+?)\d+(.*)/, c = e.match(s);
            if ("data-recheck" == a)return r = i.data("tipmsg").reck || o.reck;
            var d = t.extend({}, o.w, i.data("tipmsg").w);
            if (c[0] in d)return i.data("tipmsg").w[c[0]] || o.w[c[0]];
            for (var u in d)if (-1 != u.indexOf(c[1]) && n.test(u))return r = (i.data("tipmsg").w[u] || o.w[u]).replace(l, "$1" + c[3] + "$2" + c[4] + "$3"), i.data("tipmsg").w[c[0]] = r, r;
            return i.data("tipmsg").def || o.def
        }, _regcheck: function (t, i, a, r) {
            var r = r, s = null, n = !1, l = /\/.+\//g, d = /^(.+?)(\d+)-(\d+)$/, u = 3;
            if (l.test(t)) {
                var f = t.match(l)[0].slice(1, -1), p = t.replace(l, ""), m = RegExp(f, p);
                n = m.test(i)
            } else if ("[object Function]" == c.util.toString.call(c.util.dataType[t]))n = c.util.dataType[t](i, a, r, c.util.dataType), n === !0 || n === e ? n = !0 : (s = n, n = !1); else {
                if (!(t in c.util.dataType)) {
                    var h, g = t.match(d);
                    if (g) {
                        for (var v in c.util.dataType)if (h = v.match(d), h && g[1] === h[1]) {
                            var b = c.util.dataType[v].toString(), p = b.match(/\/[mgi]*/g)[1].replace("/", ""), y = new RegExp("\\{" + h[2] + "," + h[3] + "\\}", "g");
                            b = b.replace(/\/[mgi]*/g, "/").replace(y, "{" + g[2] + "," + g[3] + "}").replace(/^\//, "").replace(/\/$/, ""), c.util.dataType[t] = new RegExp(b, p);
                            break
                        }
                    } else n = !1, s = r.data("tipmsg").undef || o.undef
                }
                "[object RegExp]" == c.util.toString.call(c.util.dataType[t]) && (n = c.util.dataType[t].test(i))
            }
            if (n) {
                if (u = 2, s = a.attr("sucmsg") || r.data("tipmsg").r || o.r, a.attr("data-recheck")) {
                    var w = r.find("input[name='" + a.attr("data-recheck") + "']:first");
                    i != w.val() && (n = !1, u = 3, s = a.attr("data-errormsg") || c.util.getErrormsg.call(a, r, t, "data-recheck"))
                }
            } else s = s || a.attr("data-errormsg") || c.util.getErrormsg.call(a, r, t), c.util.isEmpty.call(a, i) && (s = a.attr("data-nullmsg") || c.util.getNullmsg.call(a, r));
            return {passed: n, type: u, info: s}
        }, regcheck: function (t, i, e) {
            var a = this, r = null;
            if ("ignore" === e.attr("ignore") && c.util.isEmpty.call(e, i))return e.data("cked") && (r = ""), {
                passed: !0,
                type: 4,
                info: r
            };
            e.data("cked", "cked");
            for (var s, n = c.util.parseDatatype(t), l = 0; l < n.length; l++) {
                for (var o = 0; o < n[l].length && (s = c.util._regcheck(n[l][o], i, e, a), s.passed); o++);
                if (s.passed)break
            }
            return s
        }, parseDatatype: function (t) {
            var i = /\/.+?\/[mgi]*(?=(,|$|\||\s))|[\w\*-]+/g, e = t.match(i), a = t.replace(i, "").replace(/\s*/g, "").split(""), r = [], s = 0;
            r[0] = [], r[0].push(e[0]);
            for (var n = 0; n < a.length; n++)"|" == a[n] && (s++, r[s] = []), r[s].push(e[n + 1]);
            return r
        }, showmsg: function (i, r, s, o) {
            if (i != e && ("bycheck" != o || !s.sweep || (!s.obj || s.obj.is(".Validform_error")) && "function" != typeof r)) {
                if (t.extend(s, {curform: this}), "function" == typeof r)return void r(i, s, c.util.cssctl);
                (1 == r || "byajax" == o && 4 != r) && n.find(".Validform_info").html(i), (1 == r && "bycheck" != o && 2 != s.type || "byajax" == o && 4 != r) && (l = !1, n.find(".iframe").css("height", n.outerHeight()), n.show(), a(n, 100)), 2 == r && s.obj && (s.obj.parent().next().find(".Validform_checktip").html(i), c.util.cssctl(s.obj.parent().next().find(".Validform_checktip"), s.type)), 3 != r && 4 != r || !s.obj || (s.obj.siblings(".Validform_checktip").html(i), c.util.cssctl(s.obj.siblings(".Validform_checktip"), s.type))
            }
        }, cssctl: function (t, i) {
            switch (i) {
                case 1:
                    t.removeClass("Validform_right Validform_wrong").addClass("Validform_checktip Validform_loading");
                    break;
                case 2:
                    t.removeClass("Validform_wrong Validform_loading").addClass("Validform_checktip Validform_right");
                    break;
                case 4:
                    t.removeClass("Validform_right Validform_wrong Validform_loading").addClass("Validform_checktip");
                    break;
                default:
                    t.removeClass("Validform_right Validform_loading").addClass("Validform_checktip Validform_wrong")
            }
        }, check: function (i, e, a) {
            var r = i[0].settings, e = e || "", n = c.util.getValue.call(i, t(this));
            if (r.ignoreHidden && t(this).is(":hidden") || "dataIgnore" === t(this).data("dataIgnore"))return !0;
            if (r.dragonfly && !t(this).data("cked") && c.util.isEmpty.call(t(this), n) && "ignore" != t(this).attr("ignore"))return !1;
            var l = c.util.regcheck.call(i, t(this).attr("datatype"), n, t(this));
            if (n == this.validform_lastval && !t(this).attr("data-recheck") && "" == e)return l.passed ? !0 : !1;
            this.validform_lastval = n;
            var d;
            if (s = d = t(this), !l.passed)return c.util.abort.call(d[0]), a || (c.util.showmsg.call(i, l.info, r.tiptype, {
                obj: t(this),
                type: l.type,
                sweep: r.tipSweep
            }, "bycheck"), !r.tipSweep && d.addClass("Validform_error")), !1;
            var u = t(this).attr("ajaxurl");
            if (u && !c.util.isEmpty.call(t(this), n) && !a) {
                var f = t(this);
                if (f[0].validform_subpost = "postform" == e ? "postform" : "", "posting" === f[0].validform_valid && n == f[0].validform_ckvalue)return "ajax";
                f[0].validform_valid = "posting", f[0].validform_ckvalue = n, c.util.showmsg.call(i, i.data("tipmsg").c || o.c, r.tiptype, {
                    obj: f,
                    type: 1,
                    sweep: r.tipSweep
                }, "bycheck"), c.util.abort.call(d[0]);
                var p = t.extend(!0, {}, r.ajaxurl || {}), m = {
                    type: "POST",
                    cache: !1,
                    url: u,
                    data: "param=" + encodeURIComponent(n) + "&name=" + encodeURIComponent(t(this).attr("name")),
                    success: function (e) {
                        "y" === t.trim(e.status) ? (f[0].validform_valid = "true", e.info && f.attr("sucmsg", e.info), c.util.showmsg.call(i, f.attr("sucmsg") || i.data("tipmsg").r || o.r, r.tiptype, {
                            obj: f,
                            type: 2,
                            sweep: r.tipSweep
                        }, "bycheck"), d.removeClass("Validform_error"), s = null, "postform" == f[0].validform_subpost && i.trigger("submit")) : (f[0].validform_valid = e.info, c.util.showmsg.call(i, e.info, r.tiptype, {
                            obj: f,
                            type: 3,
                            sweep: r.tipSweep
                        }), d.addClass("Validform_error")), d[0].validform_ajax = null
                    },
                    error: function (t) {
                        if ("200" == t.status)return p.success("y" == t.responseText ? {status: "y"} : {
                            status: "n",
                            info: t.responseText
                        }), !1;
                        if ("abort" !== t.statusText) {
                            var e = "status: " + t.status + "; statusText: " + t.statusText;
                            c.util.showmsg.call(i, e, r.tiptype, {
                                obj: f,
                                type: 3,
                                sweep: r.tipSweep
                            }), d.addClass("Validform_error")
                        }
                        return f[0].validform_valid = t.statusText, d[0].validform_ajax = null, !0
                    }
                };
                if (p.success) {
                    var h = p.success;
                    p.success = function (t) {
                        m.success(t), h(t, f)
                    }
                }
                if (p.error) {
                    var g = p.error;
                    p.error = function (t) {
                        m.error(t) && g(t, f)
                    }
                }
                return p = t.extend({}, m, p, {dataType: "json"}), d[0].validform_ajax = t.ajax(p), "ajax"
            }
            return u && c.util.isEmpty.call(t(this), n) && (c.util.abort.call(d[0]), d[0].validform_valid = "true"), a || (c.util.showmsg.call(i, l.info, r.tiptype, {
                obj: t(this),
                type: l.type,
                sweep: r.tipSweep
            }, "bycheck"), d.removeClass("Validform_error")), s = null, !0
        }, submitForm: function (i, e, a, r, n) {
            var l = this;
            if ("posting" === l[0].validform_status)return !1;
            if (i.postonce && "posted" === l[0].validform_status)return !1;
            var d = i.beforeCheck && i.beforeCheck(l);
            if (d === !1)return !1;
            var u, f = !0;
            if (l.find("[datatype]").each(function () {
                    if (e)return !1;
                    if (i.ignoreHidden && t(this).is(":hidden") || "dataIgnore" === t(this).data("dataIgnore"))return !0;
                    var a, r = c.util.getValue.call(l, t(this));
                    if (s = a = t(this), u = c.util.regcheck.call(l, t(this).attr("datatype"), r, t(this)), !u.passed)return c.util.showmsg.call(l, u.info, i.tiptype, {
                        obj: t(this),
                        type: u.type,
                        sweep: i.tipSweep
                    }), a.addClass("Validform_error"), i.showAllError ? (f && (f = !1), !0) : (a.focus(), f = !1, !1);
                    if (t(this).attr("ajaxurl") && !c.util.isEmpty.call(t(this), r)) {
                        if ("true" !== this.validform_valid) {
                            var n = t(this);
                            return c.util.showmsg.call(l, l.data("tipmsg").v || o.v, i.tiptype, {
                                obj: n,
                                type: 3,
                                sweep: i.tipSweep
                            }), a.addClass("Validform_error"), n.trigger("blur", ["postform"]), i.showAllError ? (f && (f = !1), !0) : (f = !1, !1)
                        }
                    } else t(this).attr("ajaxurl") && c.util.isEmpty.call(t(this), r) && (c.util.abort.call(this), this.validform_valid = "true");
                    c.util.showmsg.call(l, u.info, i.tiptype, {
                        obj: t(this),
                        type: u.type,
                        sweep: i.tipSweep
                    }), a.removeClass("Validform_error"), s = null
                }), i.showAllError && l.find(".Validform_error:first").focus(), f) {
                var p = i.beforeSubmit && i.beforeSubmit(l);
                if (p === !1)return !1;
                if (l[0].validform_status = "posting", !i.ajaxPost && "ajaxPost" !== r) {
                    i.postonce || (l[0].validform_status = "normal");
                    var a = a || i.url;
                    return a && l.attr("action", a), i.callback && i.callback(l)
                }
                var m = t.extend(!0, {}, i.ajaxpost || {});
                if (m.url = a || m.url || i.url || l.attr("action"), c.util.showmsg.call(l, l.data("tipmsg").p || o.p, i.tiptype, {
                        obj: l,
                        type: 1,
                        sweep: i.tipSweep
                    }, "byajax"), n ? m.async = !1 : n === !1 && (m.async = !0), m.success) {
                    var h = m.success;
                    m.success = function (e) {
                        i.callback && i.callback(e), l[0].validform_ajax = null, l[0].validform_status = "y" === t.trim(e.status) ? "posted" : "normal", h(e, l)
                    }
                }
                if (m.error) {
                    var g = m.error;
                    m.error = function (t) {
                        i.callback && i.callback(t), l[0].validform_status = "normal", l[0].validform_ajax = null, g(t, l)
                    }
                }
                var v = {
                    type: "POST", async: !0, data: l.serializeArray(), success: function (e) {
                        "y" === t.trim(e.status) ? (l[0].validform_status = "posted", c.util.showmsg.call(l, e.info, i.tiptype, {
                            obj: l,
                            type: 2,
                            sweep: i.tipSweep
                        }, "byajax")) : (l[0].validform_status = "normal", c.util.showmsg.call(l, e.info, i.tiptype, {
                            obj: l,
                            type: 3,
                            sweep: i.tipSweep
                        }, "byajax")), i.callback && i.callback(e), l[0].validform_ajax = null
                    }, error: function (t) {
                        var e = "status: " + t.status + "; statusText: " + t.statusText;
                        c.util.showmsg.call(l, e, i.tiptype, {
                            obj: l,
                            type: 3,
                            sweep: i.tipSweep
                        }, "byajax"), i.callback && i.callback(t), l[0].validform_status = "normal", l[0].validform_ajax = null
                    }
                };
                m = t.extend({}, v, m, {dataType: "json"}), l[0].validform_ajax = t.ajax(m)
            }
            return !1
        }, resetForm: function () {
            var t = this;
            t.each(function () {
                this.reset && this.reset(), this.validform_status = "normal"
            }), t.find(".Validform_right").text(""), t.find(".passwordStrength").children().removeClass("bgStrength"), t.find(".Validform_checktip").removeClass("Validform_wrong Validform_right Validform_loading"), t.find(".Validform_error").removeClass("Validform_error"), t.find("[datatype]").removeData("cked").removeData("dataIgnore").each(function () {
                this.validform_lastval = null
            }), t.eq(0).find("input:first").focus()
        }, abort: function () {
            this.validform_ajax && this.validform_ajax.abort()
        }
    }, t.Datatype = c.util.dataType, c.prototype = {
        dataType: c.util.dataType, eq: function (i) {
            var e = this;
            return i >= e.forms.length ? null : (i in e.objects || (e.objects[i] = new c(t(e.forms[i]).get(), {}, !0)), e.objects[i])
        }, resetStatus: function () {
            var i = this;
            return t(i.forms).each(function () {
                this.validform_status = "normal"
            }), this
        }, setStatus: function (i) {
            var e = this;
            return t(e.forms).each(function () {
                this.validform_status = i || "posting"
            }), this
        }, getStatus: function () {
            var i = this, e = t(i.forms)[0].validform_status;
            return e
        }, ignore: function (i) {
            var e = this, i = i || "[datatype]";
            return t(e.forms).find(i).each(function () {
                t(this).data("dataIgnore", "dataIgnore").removeClass("Validform_error")
            }), this
        }, unignore: function (i) {
            var e = this, i = i || "[datatype]";
            return t(e.forms).find(i).each(function () {
                t(this).removeData("dataIgnore")
            }), this
        }, addRule: function (i) {
            for (var e = this, i = i || [], a = 0; a < i.length; a++) {
                var r = t(e.forms).find(i[a].ele);
                for (var s in i[a])"ele" !== s && r.attr(s, i[a][s])
            }
            return t(e.forms).each(function () {
                var i = t(this);
                c.util.enhance.call(i, this.settings.tiptype, this.settings.usePlugin, this.settings.tipSweep, "addRule")
            }), this
        }, ajaxPost: function (i, e, a) {
            var s = this;
            return t(s.forms).each(function () {
                (1 == this.settings.tiptype || 2 == this.settings.tiptype || 3 == this.settings.tiptype) && r(), c.util.submitForm.call(t(s.forms[0]), this.settings, i, a, "ajaxPost", e)
            }), this
        }, submitForm: function (i, a) {
            var r = this;
            return t(r.forms).each(function () {
                var r = c.util.submitForm.call(t(this), this.settings, i, a);
                r === e && (r = !0), r === !0 && this.submit()
            }), this
        }, resetForm: function () {
            var i = this;
            return c.util.resetForm.call(t(i.forms)), this
        }, abort: function () {
            var i = this;
            return t(i.forms).each(function () {
                c.util.abort.call(this)
            }), this
        }, check: function (i, e) {
            var e = e || "[datatype]", a = this, r = t(a.forms), s = !0;
            return r.find(e).each(function () {
                c.util.check.call(this, r, "", i) || (s = !1)
            }), s
        }, config: function (i) {
            var e = this;
            return i = i || {}, t(e.forms).each(function () {
                var e = t(this);
                this.settings = t.extend(!0, this.settings, i), c.util.enhance.call(e, this.settings.tiptype, this.settings.usePlugin, this.settings.tipSweep)
            }), this
        }
    }, t.fn.Validform = function (t) {
        return new c(this, t)
    }, t.Showmsg = function (t) {
        r(), c.util.showmsg.call(i, t, 1, {})
    }, t.Hidemsg = function () {
        n.hide(), l = !0
    }
}(jQuery, window)