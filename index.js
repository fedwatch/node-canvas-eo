// const Canvas = require('canvas');
// const canvas = new Canvas(100, 30),
//     ctx = canvas.getContext('2d');
//
// ctx.font = '24px "Microsoft YaHei"';
//
// // 绘制文本
// let drawText = (text, x) => {
//     ctx.save();
//     // 旋转角度
//     const angle = Math.random() / 10;
//     // y 坐标
//     const y = 22;
//     ctx.rotate(angle);
//     ctx.fillText(text, x, y);
//     ctx.restore();
// }
//
// // 随机画线
// let drawLine = (width,height) => {
//     const num = Math.floor(Math.random() * 2 + 3);
//     // 随机画几条彩色线条
//     for (let i = 0; i < num; i++) {
//         const color = '#' + (Math.random() * 0xffffff << 0).toString(16);
//         const y1 = Math.random() * height;
//         const y2 = Math.random() * height;
//         // 画线
//         ctx.strokeStyle = color;
//         ctx.beginPath();
//         ctx.lineTo(0, y1);
//         ctx.lineTo(width, y2);
//         ctx.stroke();
//     }
// }
//
// // 数字的文本随机从小写汉字、大写汉字、数字里选择
// const numArr = [
//     '〇一二三四五六七八九',
//     '0123456789',
//     '零壹贰叁肆伍陆柒捌玖'
// ];
// // 第一个数字
// const fir = Math.floor(Math.random() * 10);
// // 第二个数字
// const sec = Math.floor(Math.random() * 10);
// // 随机选取运算
// const operArr = ['加', '减', '乘'];
// const oper = Math.floor(Math.random() * operArr.length);
//
// drawLine();
// drawText(numArr[Math.floor(Math.random() * numArr.length)][fir], 10);
// drawText(operArr[oper], 40);
// drawText(numArr[Math.floor(Math.random() * numArr.length)][sec], 70);
// drawText('=', 100);
// drawText('?', 130);
//
// // 验证码值的计算
// let captcha;
// switch(oper) {
//     case 0:
//         captcha = fir + sec;
//         break;
//     case 1:
//         captcha = fir - sec;
//         break;
//     case 2:
//         captcha = fir * sec;
//         break;
// }
//
// // 存入 session
// req.session.captcha = captcha;
//
// res.send({
//     status: 200,
//     data: canvas.toDataURL()
// })

var Canvas = require('canvas'),
    fs = require('fs'),
    path = require('path'),
    canvas = new Canvas(200,200)
    , ctx = canvas.getContext('2d');
ctx.font = '30px PingFangSC';
ctx.rotate(.1);
ctx.fillStyle = 'rgba(7,88,0,0.5)';
ctx.fillText("中文字体", 50, 100);
// var te = ctx.measureText('Awesome!');

// ctx.beginPath();
// ctx.lineTo(50, 102);
// ctx.lineTo(50 + te.width, 102);
// ctx.stroke();
console.log('<img src="' + canvas.toDataURL() + '" />');


genChineseFont("./dist",150,200)


/**
 * 生成中文字体
 * @param options
 * @param savePath
 * @param size
 * @returns {Promise<any>}
 */
function genChineseFont(options, savePath, size){
    return new Promise((resolve, reject)=>{
        try{
            const canvas = new Canvas(parseInt(size.width,10), parseInt(size.height,10));
            const font = new Canvas.Font('华文仿宋', path.join(__dirname, '华文仿宋.ttf'));
            const ctx = canvas.getContext('2d');
            ctx.addFont(font);
            ctx.font = '12px 华文仿宋';

            // echarts.setCanvasCreator(function () {
            //     return canvas;
            // });
            // const chart = echarts.init(canvas);
            options.animation = false;
            options.textStyle = {
                fontFamily: '华文仿宋',
                fontSize: 12,
            };
            // chart.setOption(options);
            try {
                fs.writeFileSync(savePath, chart.getDom().toBuffer());
                console.log("Create Img:" + savePath);
            } catch (err){
                console.error("Error: Write File failed" + err.message);
            }
            resolve();
        }catch (e) {
            console.log(e)

        }


        // '/Library/Fonts/微软雅黑.ttf'
        // Canvas.registerFont('comicsans.ttf', {family: 'Comic Sans'});
    })

}


module.exports = {
    genChineseFont:genChineseFont
}

