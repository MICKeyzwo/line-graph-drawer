const LineGraphDrawer = (_ => {

    //constructor func
    const LineGraphDrawer = function (param) {

        "use strict";

        //dom element create func
        const el = tag => document.createElement(tag);

        //setup param valuea
        const data = param.data;
        if (!data) {
            throw new Error("Illegal argument.\nline graph drawer requires prot data array!");
        }
        const label = param.label || new Array(data.length).fill(0).map((_, i) => i);
        const insertTarget = document.querySelector(param.el);
        const labelWidth = 50;
        const height = param.height || 300;
        const graphWidth = param.width ? param.width - 50 : 350;
        const distance = param.labelDistance || 50;
        const strokeColor = param.strokeColor || "blue";
        const fillColor = param.fillColor || "rgba(0, 0, 255, 0.5)";
        const pointColor = param.pointColor || "blue";
        const ruleNumber = param.ruleNumber || 5;
        const ruleMax = param.ruleMax || Math.max(...data) * 1.2;

        //setup elements
        const appWrap = el("div");
        const vLabel = el("canvas");
        const canvasWrap = el("div");
        const canvas = el("canvas");
        appWrap.appendChild(vLabel);
        canvasWrap.appendChild(canvas);
        appWrap.appendChild(canvasWrap);
        appWrap.style.display = "flex";
        vLabel.width = labelWidth;
        vLabel.height = height;
        canvasWrap.style.height = height + "px";
        canvasWrap.style.width = graphWidth + "px";
        canvasWrap.style.overflow = "auto";
        canvas.height = height;
        canvas.width = distance * (data.length - 1) + 40;

        this.data = data;
        this.label = label;
        this.distance = distance;
        this.height = height;
        this.width = param.width;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.pointColor = pointColor;
        this.ruleNumber = ruleNumber;
        this.ruleMax = ruleMax;
        this._app = appWrap;
        this._vlabel = vLabel;
        this._canvas = canvas;

        //element insertion
        if (insertTarget) {
            insertTarget.appendChild(appWrap);
            this.render();
        }

    };

    //rendering graph
    LineGraphDrawer.prototype.render = function () {

        "use strict";

        const data = this.data;
        const label = this.label;
        const distance = this.distance;
        const height = this.height;
        const strokeColor = this.strokeColor;
        const fillColor = this.fillColor;
        const pointColor = this.pointColor;
        const vLabel = this._vlabel;
        const canvas = this._canvas;

        const graphMax = this.ruleMax || Math.max(...data) * 1.2;
        const ruleNumber = this.ruleNumber || 5;
        let step = new Array(ruleNumber + 1).fill(0).map((_, i) => i * graphMax / ruleNumber);

        //print v-label
        const labelCtx = vLabel.getContext("2d");
        labelCtx.clearRect(0, 0, vLabel.width, vLabel.height);
        labelCtx.textAlign = "right";
        labelCtx.font = "12px 'Times New Roman'";
        labelCtx.textBaseline = "middle";
        labelCtx.fillStyle = "black";
        step.forEach((s, i) => {
            labelCtx.fillText((s + "").slice(0, 6), 45, (height - 50) - (height - 70) / ruleNumber * i);
        });

        //print graph border
        canvas.width = distance * (data.length - 1) + 40;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 0, canvas.width - 40, canvas.height - 50);

        //print h-label
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = "black";
        label.forEach((l, i) => {
            ctx.fillText(l, 20 + i * distance, canvas.height - 45);
        });

        //draw rule
        ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
        ctx.lineWidth = 2;
        step.forEach((_, i) => {
            if (i == 0) return;
            ctx.beginPath();
            ctx.moveTo(20, (height - 50) - (height - 70) / ruleNumber * i);
            ctx.lineTo(canvas.width - 20, (height - 50) - (height - 70) / ruleNumber * i);
            ctx.stroke();
        });
        label.forEach((_, i) => {
            if (i == 0 || i == label.length - 1) return;
            ctx.beginPath();
            ctx.moveTo(20 + i * distance, canvas.height - 50);
            ctx.lineTo(20 + i * distance, 0);
            ctx.stroke();
        });

        //draw line
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        data.forEach((d, i) => {
            if (i == 0) ctx.moveTo(20, (canvas.height - 50) - (d / step[step.length - 1] * (height - 70)));
            else ctx.lineTo(20 + i * distance, (canvas.height - 50) - (d / step[step.length - 1] * (height - 70)));
        });
        ctx.stroke();

        //draw points
        data.forEach((d, i) => {
            ctx.fillStyle = pointColor;
            ctx.beginPath();
            ctx.arc(20 + i * distance, (canvas.height - 50) - (d / step[step.length - 1] * (height - 70)), 5, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            labelCtx.font = "15px 'Arial'";
            ctx.fillText((d + "").slice(0, 6), 20 + i * distance, (canvas.height - 50) - (d / step[step.length - 1] * (height - 70)) - 5);
        });

        //fill line area
        ctx.fillStyle = fillColor;
        data.forEach((d, i) => {
            if (i == 0) ctx.moveTo(20, (canvas.height - 50) - (d / step[step.length - 1] * (height - 70)));
            else ctx.lineTo(20 + i * distance, (canvas.height - 50) - (d / step[step.length - 1] * (height - 70)));
        });
        ctx.lineTo(canvas.width - 20, height - 50);
        ctx.lineTo(20, height - 50);
        ctx.closePath();
        ctx.fill();

    };

    //insert graph to element
    LineGraphDrawer.prototype.appendTo = function (el) {

        "use strict";

        const elm = document.querySelector(el);
        if (elm) elm.appendChild(this._app);

    };

    return LineGraphDrawer;

})();