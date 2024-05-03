// eslint-disable-next-line no-use-before-define
var Config = config(); // eslint-disable-line
export function handleKeyDown(event, element, type) {
    if (
        (event.key === "Enter" || event.keyCode === 13 || event.which === 13) &&
        !event.shiftKey
    ) {
        if (type == "textarea") {
            element.current.querySelector("textarea").focus();
        } else if (type == "input") {
            element.current.querySelector("input").focus();
        } else if (type == "Date") {
            element.current.querySelector("input").focus();
        } else if (type == "btn") {
            element.current.click();
        }
    }
}
var lastSnackbars = [];
export function toast(message, time = 3000, parent) {
    var mb = 0;
    if (lastSnackbars.length) mb = lastSnackbars.length * 80;
    var snackbar = document.createElement("div");
    var random = Math.random().toString(36).substring(7);
    snackbar.setAttribute("id", "snackbar_" + random);
    snackbar.classList.add("snackbar");

    (parent || document.body).appendChild(snackbar);

    //snackbar.className = "show";
    snackbar.style.cssText = `visibility: visible;
            -webkit-animation: fadein 0.5s, fadeout 0.5s ${time - 500}ms;
            animation: fadein 0.5s, fadeout 0.5s ${time - 500}ms;
            margin-top: ${mb}px`;
    snackbar.innerHTML = message;

    snackbar.addEventListener("click", () => {
        snackbar.remove();
        lastSnackbars = lastSnackbars.filter(function (item) {
            return item.id !== snackbar.id;
        });
        lastSnackbars.forEach((el) => {
            el.style.marginTop = parseInt(el.style.marginTop) - 80 + "px";
        });
        snackbar = null;
    });

    setTimeout(() => {
        if (snackbar) {
            lastSnackbars.forEach((el) => {
                el.style.marginTop = parseInt(el.style.marginTop) - 80 + "px";
            });
        }
    }, time - 500);
    setTimeout(function () {
        if (snackbar) {
            snackbar.style.cssText = "";
            setTimeout(() => {
                snackbar.remove();
                lastSnackbars = lastSnackbars.filter(function (item) {
                    return item.id !== snackbar.id;
                });
            }, 500);
        }
    }, time - 100);
    lastSnackbars.push(snackbar);
}
export function modalAlert(message, title, options) {
    if (message && typeof message === "string")
        while (message.includes("\r\n"))
            message = message.replace("\r\n", "<br/>");
    if (typeof options != "object") {
        options = {};
    }
    if (options.delay != undefined) {
        options.delay++;
        options.delay--;
    } else {
        options.delay = 100;
    }
    if (!window.smile_alert) {
        var smile_obj = {
            selecter: "smile-modalAlert",
            element: null,
            filter: 30,
            cancelElement: null,
            confirmElement: null,
        };
        smile_obj.element = document.querySelector(smile_obj.selecter);
    } else {
        if (window.smile_alert.cancel) {
            window.smile_alert.cancelElement.style = "";
        }
        if (window.smile_alert.confirm) {
            window.smile_alert.confirmElement.style = "";
        }
        window.smile_alert.element.style.display = "block";
        smile_obj = window.smile_alert;
    }
    // document.querySelector("#dvContent").style.filter = "blur(2px)";
    // document.querySelector(".header").style.filter = "blur(2px)";
    smile_obj.cancel = options.cancel != undefined ? options.cancel : false;
    smile_obj.cancelText =
        options.cancelText != undefined ? options.cancelText : "انصراف";
    smile_obj.cancelCallBack = function (event) {
        window.smile_alert.cancelElement.style =
            "background-color:#999;color:#000;filter:alpha(opacity=" +
            window.smile_alert.filter +
            ");-moz-opacity:" +
            window.smile_alert.filter / 100 +
            ";-khtml-opacity: " +
            window.smile_alert.filter / 100 +
            ";opacity: " +
            window.smile_alert.filter / 100 +
            ";";
        setTimeout(function () {
            window.smile_alert.element.style.display = "none";
            if (typeof options.cancelCallBack == "function") {
                options.cancelCallBack(event);
            }
            return true;
        }, window.smile_alert.delay);
        // document.querySelector("#dvContent").style.filter = "none";
        // document.querySelector(".header").style.filter = "none";
        //console.log('concel');
    };
    smile_obj.closeCallBack = function () {
        window.smile_alert.cancelElement.style =
            "background-color:#999;color:#000;filter:alpha(opacity=" +
            window.smile_alert.filter +
            ");-moz-opacity:" +
            window.smile_alert.filter / 100 +
            ";-khtml-opacity: " +
            window.smile_alert.filter / 100 +
            ";opacity: " +
            window.smile_alert.filter / 100 +
            ";";
        setTimeout(function () {
            window.smile_alert.element.style.display = "none";
            return true;
        }, window.smile_alert.delay);
        // document.querySelector("#dvContent").style.filter = "none";
        // document.querySelector(".header").style.filter = "none";
        //console.log('concel');
    };
    smile_obj.message = message;
    smile_obj.title = title;
    smile_obj.confirm = options.confirm != undefined ? options.confirm : true;
    smile_obj.confirmText =
        options.confirmText != undefined ? options.confirmText : "متوجه شدم";
    smile_obj.confirmCallBack = function (event) {
        window.smile_alert.confirmElement.style =
            "background-color:#999;color:#04BE02;filter:alpha(opacity=" +
            window.smile_alert.filter +
            ");-moz-opacity:" +
            window.smile_alert.filter / 100 +
            ";-khtml-opacity: " +
            window.smile_alert.filter / 100 +
            ";opacity: " +
            window.smile_alert.filter / 100 +
            ";";
        setTimeout(function () {
            window.smile_alert.element.style.display = "none";
            if (typeof options.confirmCallBack == "function") {
                options.confirmCallBack(event);
            }
            return true;
        }, window.smile_alert.delay);
        // document.querySelector("#dvContent").style.filter = "none";
        // document.querySelector(".header").style.filter = "none";
        //console.log('confirm');
    };
    if (!smile_obj.element) {
        smile_obj.html =
            '<div class="' +
            smile_obj.selecter +
            '" id="' +
            smile_obj.selecter +
            '">' +
            '<div class="' +
            smile_obj.selecter +
            '-mask"></div>' +
            '<div class="' +
            smile_obj.selecter +
            '-message-body">' +
            '<button class="' +
            smile_obj.selecter +
            '-message-button-close"><span>×</span ></button >' +
            '<div class="' +
            smile_obj.selecter +
            "-message-tbf " +
            smile_obj.selecter +
            '-message-title"><strong class="' +
            smile_obj.selecter +
            '-message-tbf ">' +
            smile_obj.title +
            "</strong></div>" +
            '<div class="' +
            smile_obj.selecter +
            "-message-tbf " +
            smile_obj.selecter +
            '-message-content">' +
            smile_obj.message +
            "</div>" +
            '<div class="' +
            smile_obj.selecter +
            "-message-tbf " +
            smile_obj.selecter +
            '-message-button">';
        if (smile_obj.cancel || true) {
            smile_obj.html +=
                '<a href="javascript:;" class="' +
                smile_obj.selecter +
                "-message-tbf " +
                smile_obj.selecter +
                '-message-button-cancel">' +
                smile_obj.cancelText +
                "</a>";
        }
        if (smile_obj.confirm || true) {
            smile_obj.html +=
                '<a href="javascript:;" class="' +
                smile_obj.selecter +
                "-message-tbf " +
                smile_obj.selecter +
                '-message-button-confirm">' +
                smile_obj.confirmText +
                "</a>";
        }
        smile_obj.html += "</div>" + "</div>" + "</div>";
        var element = document.createElement("div");
        element.id = smile_obj.selecter + "-wrap";
        element.innerHTML = smile_obj.html;
        document.body.appendChild(element);
        smile_obj.element = document.querySelector("." + smile_obj.selecter);
        smile_obj.cancelElement = document.querySelector(
            "." + smile_obj.selecter + "-message-button-cancel"
        );
        smile_obj.closeButton = document.querySelector(
            "." + smile_obj.selecter + "-message-button-close"
        );
        if (smile_obj.cancel) {
            document.querySelector(
                "." + smile_obj.selecter + "-message-button-cancel"
            ).style.display = "block";
        } else {
            document.querySelector(
                "." + smile_obj.selecter + "-message-button-cancel"
            ).style.display = "none";
        }
        smile_obj.confirmElement = document.querySelector(
            "." + smile_obj.selecter + "-message-button-confirm"
        );
        if (smile_obj.confirm) {
            document.querySelector(
                "." + smile_obj.selecter + "-message-button-confirm"
            ).style.display = "block";
        } else {
            document.querySelector(
                "." + smile_obj.selecter + "-message-button-confirm"
            ).style.display = "none";
        }
        smile_obj.cancelElement.onclick = smile_obj.cancelCallBack;
        if (!options.close) smile_obj.closeButton.display = "none";
        else smile_obj.closeButton.onclick = smile_obj.closeCallBack;
        smile_obj.confirmElement.onclick = smile_obj.confirmCallBack;
        window.smile_alert = smile_obj;
        //console.log(smile_alert);
    }
    document.querySelector(
        "." + smile_obj.selecter + "-message-title"
    ).innerHTML = "";
    document.querySelector(
        "." + smile_obj.selecter + "-message-content"
    ).innerHTML = "";
    document.querySelector(
        "." + smile_obj.selecter + "-message-button-cancel"
    ).innerHTML = smile_obj.cancelText;
    document.querySelector(
        "." + smile_obj.selecter + "-message-button-confirm"
    ).innerHTML = smile_obj.confirmText;
    smile_obj.cancelElement = document.querySelector(
        "." + smile_obj.selecter + "-message-button-cancel"
    );
    smile_obj.closeButton = document.querySelector(
        "." + smile_obj.selecter + "-message-button-close"
    );
    if (smile_obj.cancel) {
        document.querySelector(
            "." + smile_obj.selecter + "-message-button-cancel"
        ).style.display = "block";
    } else {
        document.querySelector(
            "." + smile_obj.selecter + "-message-button-cancel"
        ).style.display = "none";
    }
    smile_obj.confirmElement = document.querySelector(
        "." + smile_obj.selecter + "-message-button-confirm"
    );
    if (smile_obj.confirm) {
        document.querySelector(
            "." + smile_obj.selecter + "-message-button-confirm"
        ).style.display = "block";
    } else {
        document.querySelector(
            "." + smile_obj.selecter + "-message-button-confirm"
        ).style.display = "none";
    }
    smile_obj.cancelElement.onclick = smile_obj.cancelCallBack;

    if (!options.close) smile_obj.closeButton.style.display = "none";
    else smile_obj.closeButton.onclick = smile_obj.closeCallBack;
    smile_obj.confirmElement.onclick = smile_obj.confirmCallBack;
    if (smile_obj.title && smile_obj.message) {
        document.querySelector(
            "." + smile_obj.selecter + "-message-title"
        ).innerHTML = smile_obj.title;
        if (
            message &&
            (message instanceof Element || message instanceof HTMLDocument)
        )
            document
                .querySelector("." + smile_obj.selecter + "-message-content")
                .appendChild(smile_obj.message);
        else
            document.querySelector(
                "." + smile_obj.selecter + "-message-content"
            ).innerHTML = smile_obj.message;
    } else if (smile_obj.message) {
        if (
            message &&
            (message instanceof Element || message instanceof HTMLDocument)
        )
            document
                .querySelector("." + smile_obj.selecter + "-message-content")
                .appendChild(smile_obj.message);
        else
            document.querySelector(
                "." + smile_obj.selecter + "-message-content"
            ).innerHTML = smile_obj.message;
    } else if (smile_obj.title) {
        document.querySelector(
            "." + smile_obj.selecter + "-message-title"
        ).innerHTML = smile_obj.title;
    }
    window.smile_alert = smile_obj;
}
export function ApiServices(url, body = null, method, execel) {
    const totalUrl = `${Config.RootAddress}/${url}`;
    const bodyDate = JSON.stringify(body || {});
    var myHeaders = new Headers();
    if (execel) {
        myHeaders.append(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
    } else {
        myHeaders.append("Content-Type", "application/json");
    }

    myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("ticket")
    );
    return fetch(totalUrl, {
        method: method,
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        redirect: "follow",
        referrer: "no-referrer",
        headers: myHeaders,
        body: method.toLowerCase() == "get" ? null : bodyDate,
    });
}
export function CallService(
    servicesUrl,
    obj,
    method,
    setIsLoading,
    hasLoading = false,
    execel
) {
    hasLoading === true ? setIsLoading(true) : setIsLoading(false);
    return ApiServices(servicesUrl, obj, method, execel)
        .then(async (response) => {
            setIsLoading(false);
            var responseText = "";
            if (response.ok) {
                if (execel) {
                    return response;
                } else {
                    try {
                        responseText = await response.text();
                    } catch {
                        responseText = "";
                    }
                }
                return responseText;
            } else {
                if (response.status === 400) {
                    try {
                        const errorResponseText = await response.text();
                        return Promise.reject(errorResponseText);
                    } catch {
                        return Promise.reject('یافت نشد.');
                    }
                } else {
                    return Promise.reject(response);
                }
            }
        })
        .then((data) => {
            try {
                if (execel) {
                    data = data.blob();
                } else {
                    data = JSON.parse(data);
                }
            } catch (e) {
                console.error(e.message);
            }
            return data;
        });
}