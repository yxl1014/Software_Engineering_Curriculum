/**
/**
 * @module $echartsBox
 * @fileoverview ͼ����ӣ�$echartsBox
 * @description 
 * @version 0.1
 * @author LC
 */
var $echartsBox;
(function () {
    var _eb = $echartsBox = {
		// �汾��
        version: "1.0",
        // ͼ����󼯺�
        _boxs: {},
        // ͼ����󼯺�
        _interval: {},
        // ��ʼ������
        _param: {},
        // ��ʼ������
        /**
         * @method ��ʼ������ init
         * @param {object} param ��ʼ������
         * @param {object} custom ͼ���������
         * @example
        $echartsBox.init({
            // �Ƿ��洰�ڴ�С�仯
            resize: true,
            // �Ƿ���Ӷ�ʱ������,�Լ����ʹ�� ���ʾ��ʱ��ʱ��
            intervalTime: 10000,
            // ȫ�ֲ�����ȡ����
            getQueryTerms: queryTerm,
            // ��ʱˢ�»ص�����
            rfcb: refreshFuns,
            // �洰�ڱ仯�ص�����
            rscb: resizeFuns
        }, {
            // ��:ͼ������ID
            echartsId: {
                // �÷���ֻ����һ��
                // init: function () {},
                qi: function () {
                    this.callback({
                        ...
                    });
                }
            },
        });
         */
        init: function init(param, custom) {
            this._param = param; // ��ʼ��ͼ�����
            var box = null;
            for (var k in custom) {
              box = this._boxs[k] = custom[k]; // if (box.isRegister) {
              // ��ֹע��ʱ ������жϣ�����isRegister��ʾ�Ƿ�ע�ᣬ��box�б�ʾ�Ƿ���ע��
              // box.isRegister = false;
              this.register(k); // }
            } // �洰�ڽ��б仯
            if (this._param.resize) {
              window.onresize = function () {
                _eb.resize();
              };
            } // ��ʱˢ��
            if (this._param.intervalTime) {
              this._interval = setInterval(function () {_eb.refresh();}, this._param.intervalTime);
            }
        },
        getQueryTerms: function (boxQts) {
            var qts = this._param.getQueryTerms() || {};
            if (boxQts) {
                for (var k in boxQts) {
                    qts[k] = boxQts[k];
                }
            }
            return qts;
        },
        /**
         * @memberof echartsBox
         * @method ����ID����ע��һ��ͼ�� register
         * @param {string} id ����ID
         * @param {object=} param �����Զ�������
         */
        register: function (id, _param) {
            var box = this._boxs[id];
            if (box) {
                // if (box.isRegister) {
                //     console.log("��ע�ᣨ" + id + "��,�����ظ�ע��");
                //     return box;
                // }
                var dom = document.getElementById(id);
                if (dom) {
                    // ע��
                    box.chart = echarts.init(dom);
                    box._param = _param ? _param : {} ;
                    box.id = id;
                    box.isRegister = true;
                    box.callback = function (option) {
                        this.chart.clear();
                        this.chart.setOption(option);
                    };
                    var this_ = this;
                    box.getQueryTerms = function (boxQts) {
                        return this_.getQueryTerms(boxQts);
                    }
                    // ִ�з���ǰ������ע�ḽ����ͼ�����
                    var attachChartIds = box.attachChartIds;
                    var attachChart = box.attachChart = {};
                    if (attachChartIds && attachChartIds.length > 0) {
                        attachChartIds.forEach(function (ac, i) {
                            _eb._boxs[ac] = attachChart[ac] = {
								"isRegister": true,
								"id": ac,
                                "chart": echarts.init(document.getElementById(ac)),
                                "callback": function (option) {
                                    this.chart.clear();
                                    this.chart.setOption(option);
                                }
                            }
                        });
                    }
                    // ִ�з���
                    if (box.init) box.init(box);
                    box.qi();
                    return box;
                } else {
                    throw new Error("δ��ѯ��DOM��" + id + "��Ԫ�أ�");
                }
            } else {
                throw new Error("ͼ������δ���壡");
            }
        },
        /**
         * @memberof echartsBox
         * @method ���¶���ͼ���С resize
         * @param {Array=} ids ����ֵ������ȫ��
         */
        resize: function (ids) {
            if (Array.prototype.isPrototypeOf(ids)) {
                var this_ = this;
                ids.forEach(function (id) {
                    this_._boxs[id].chart.resize();
                });
                return;
            }
            var box = null;
            for (var k in this._boxs) {
                box = this._boxs[k];
                if (box.isRegister) {
                    box.chart.resize();
                }
            }
            var rscb = this._param.rscb;
            if (rscb) rscb();
        },
        /**
         * @memberof echartsBox
         * @method ˢ��ͼ�� refresh 
         * @param {Array=} ids ����ֵ��ˢ��ȫ��
         */
        refresh: function (ids) {
            if (Array.prototype.isPrototypeOf(ids)) {
                var this_ = this;
                ids.forEach(function (id) {
                    this_._boxs[id].qi();
                });
                return;
            }
            var box = null
            for (var k in this._boxs) {
                box = this._boxs[k];
                if (box.isRegister) {
                    box.qi();
                }
            }
            var rfcb = this._param.rfcb;
            if (rfcb) rfcb();
        },
        /**
         * @memberof echartsBox
         * @method �Ƴ�ͼ�� remove
         * @param {Array} id ����IDɾ��ͼ��
         */
        remove: function (id) {
            if (this._boxs[id]) {
                delete this._boxs[id];
            } else {
                throw new Error("���󲻴��ڣ�");
            }
        }
    };
 })()