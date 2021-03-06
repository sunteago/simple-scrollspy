//this initial function is a fix i found because when you get the offsetTop it gets the distance to the parent, if you have your sections inside of container you'll have a problem
const getOffsetTop = element => {
  let offsetTop = 0;
  while(element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}
!(function(t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.scrollSpy = e())
    : (t.scrollSpy = e());
})

(window, function() {
  return (function(t) {
    var e = {};
    function o(n) {
      if (e[n]) return e[n].exports;
      var r = (e[n] = { i: n, l: !1, exports: {} });
      return t[n].call(r.exports, r, r.exports, o), (r.l = !0), r.exports;
    }
    return (
      (o.m = t),
      (o.c = e),
      (o.d = function(t, e, n) {
        o.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
      }),
      (o.r = function(t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (o.t = function(t, e) {
        if ((1 & e && (t = o(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (o.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var r in t)
            o.d(
              n,
              r,
              function(e) {
                return t[e];
              }.bind(null, r)
            );
        return n;
      }),
      (o.n = function(t) {
        var e =
          t && t.__esModule
            ? function() {
                return t.default;
              }
            : function() {
                return t;
              };
        return o.d(e, "a", e), e;
      }),
      (o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (o.p = ""),
      o((o.s = 0))
    );
  })([
    function(t, e, o) {
      t.exports = (t, e = {}) => {
        const { ScrollSpy: n } = o(1),
          r = new n(t, e);
        return (
          (window.onload = r.onScroll()),
          window.addEventListener("scroll", () => r.onScroll()),
          r
        );
      };
    },
    function(t, e, o) {
      "use strict";
      o.r(e),
        o.d(e, "ScrollSpy", function() {
          return n;
        });
      class n {
        constructor(t, e = {}) {
          if (!t)
            throw new Error(
              "First argument is query selector to your navigation."
            );
          if ("object" != typeof e)
            throw new Error("Second argument must be instance of Object.");
          (this.menuList =
            t instanceof HTMLElement ? t : document.querySelector(t)),
            (this.options = Object.assign(
              {},
              {
                sectionClass: ".scrollspy",
                menuActiveTarget: "li > a",
                offset: 0,
                hrefAttribute: "href",
                activeClass: "active"
              },
              e
            )),
            (this.sections = document.querySelectorAll(
              this.options.sectionClass
            ));
        }
        onScroll() {
          const t = this.getSectionInView(),
            e = this.getMenuItemBySection(t);
          e && (this.removeCurrentActive({ ignore: e }), this.setActive(e));
        }
        getMenuItemBySection(t) {
          if (!t) return;
          const e = t.getAttribute("id");
          return this.menuList.querySelector(
            `[${this.options.hrefAttribute}="#${e}"]`
          );
        }
        getSectionInView() {
          for (let t = 0; t < this.sections.length; t++) {
            const e = getOffsetTop(this.sections[t].offsetTop);
            console.log(e);
              const o = e + this.sections[t].offsetHeight;
              const n =
                (document.documentElement.scrollTop ||
                  document.body.scrollTop) + this.options.offset;
            if (n > e && n <= o) return this.sections[t];
          }
        }
        setActive(t) {
          t.classList.contains(this.options.activeClass) ||
            t.classList.add(this.options.activeClass);
        }
        removeCurrentActive({ ignore: t }) {
          const { hrefAttribute: e, menuActiveTarget: o } = this.options,
            n = `${o}.active:not([${e}="${t.getAttribute(e)}"])`;
          this.menuList
            .querySelectorAll(n)
            .forEach(t => t.classList.remove(this.options.activeClass));
        }
      }
    }
  ]);
});
