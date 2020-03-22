(this.webpackJsonpphonebook = this.webpackJsonpphonebook || []).push([
  [0],
  {
    14: function (e, n, t) {
      e.exports = t(37);
    },
    19: function (e, n, t) {},
    37: function (e, n, t) {
      "use strict";
      t.r(n);
      var a = t(0),
        c = t.n(a),
        r = t(13),
        o = t.n(r),
        u = (t(19), t(2)),
        i = function (e) {
          return c.a.createElement(
            "form",
            { onSubmit: e.addContact },
            c.a.createElement(
              "div",
              null,
              "Name:",
              " ",
              c.a.createElement("input", {
                value: e.newName,
                onChange: e.handleContactChange,
              })
            ),
            c.a.createElement(
              "div",
              null,
              "Number:",
              " ",
              c.a.createElement("input", {
                value: e.newNumber,
                onChange: e.handleNumberChange,
              })
            ),
            c.a.createElement(
              "div",
              null,
              c.a.createElement("button", { type: "submit" }, "Add")
            )
          );
        },
        l = function (e) {
          var n = e.notificationClass,
            t = e.notificationMessage;
          return null === t
            ? null
            : c.a.createElement("div", { className: n }, t);
        },
        m = function (e) {
          return c.a.createElement(
            "div",
            null,
            e.persons
              .filter(function (n) {
                return n.name
                  .toUpperCase()
                  .includes(e.searchName.toUpperCase());
              })
              .map(function (n) {
                return c.a.createElement(
                  "div",
                  { key: n.id },
                  n.name,
                  " ",
                  n.number,
                  c.a.createElement(
                    "button",
                    {
                      onClick: function () {
                        return e.handleDeletePerson(n.id, n.name);
                      },
                    },
                    "Delete"
                  )
                );
              })
          );
        },
        f = function (e) {
          return c.a.createElement(
            "div",
            null,
            "Search:",
            " ",
            c.a.createElement("input", {
              value: e.searchName,
              onChange: e.handleSearchNameChange,
            })
          );
        },
        s = t(3),
        d = t.n(s),
        h = "/api/contacts",
        b = function () {
          return d.a.get(h).then(function (e) {
            return e.data;
          });
        },
        p = function (e) {
          return d.a.post(h, e).then(function (e) {
            return e.data;
          });
        },
        E = function (e) {
          return d.a.delete("".concat(h, "/").concat(e)).then(function (e) {
            return e.data;
          });
        },
        v = function (e, n) {
          return d.a.put("".concat(h, "/").concat(e), n).then(function (e) {
            return e.data;
          });
        },
        C = function () {
          var e = Object(a.useState)([]),
            n = Object(u.a)(e, 2),
            t = n[0],
            r = n[1],
            o = Object(a.useState)(""),
            s = Object(u.a)(o, 2),
            d = s[0],
            h = s[1],
            C = Object(a.useState)(""),
            g = Object(u.a)(C, 2),
            N = g[0],
            w = g[1],
            j = Object(a.useState)("notification"),
            O = Object(u.a)(j, 2),
            S = O[0],
            k = O[1],
            y = Object(a.useState)(null),
            D = Object(u.a)(y, 2),
            T = D[0],
            P = D[1],
            U = Object(a.useState)(""),
            A = Object(u.a)(U, 2),
            J = A[0],
            M = A[1];
          Object(a.useEffect)(function () {
            b().then(function (e) {
              r(e);
            });
          }, []);
          return c.a.createElement(
            "div",
            null,
            c.a.createElement("h2", null, "Phonebook"),
            c.a.createElement(l, {
              notificationClass: S,
              notificationMessage: T,
            }),
            c.a.createElement(f, {
              searchName: J,
              handleSearchNameChange: function (e) {
                M(e.target.value);
              },
            }),
            c.a.createElement("h2", null, "Add new contact"),
            c.a.createElement(i, {
              addContact: function (e) {
                e.preventDefault();
                var n = { name: d, number: N };
                if (
                  t
                    .map(function (e) {
                      return e.name;
                    })
                    .includes(d)
                ) {
                  window.confirm(
                    "".concat(
                      d,
                      " is already in your phonebook. Update phone number?"
                    )
                  );
                  var a = t.filter(function (e) {
                    return e.name.includes(d);
                  })[0].id;
                  v(a, n)
                    .then(function (e) {
                      r(
                        t.map(function (n) {
                          return n.id !== a ? n : e;
                        })
                      ),
                        k("notification"),
                        P('Contact "'.concat(n.name, '" was updated.')),
                        setTimeout(function () {
                          P(null);
                        }, 2e3),
                        h(""),
                        w("");
                    })
                    .catch(function (e) {
                      k("error"),
                        P(
                          "Contact ".concat(
                            a,
                            " was already deleted from the server"
                          )
                        ),
                        setTimeout(function () {
                          P(null);
                        }, 2e3),
                        r(
                          t.filter(function (e) {
                            return e.id !== a;
                          })
                        );
                    });
                } else
                  p(n)
                    .then(function (e) {
                      r(t.concat(e)),
                        k("notification"),
                        P("".concat(n.name, " was added to your contacts.")),
                        setTimeout(function () {
                          P(null);
                        }, 2e3),
                        h(""),
                        w("");
                    })
                    .catch(function (e) {
                      k("error"),
                        P(e.response.data.error),
                        setTimeout(function () {
                          P(null);
                        }, 2e3),
                        h(""),
                        w("");
                    });
              },
              newName: d,
              handleContactChange: function (e) {
                h(e.target.value);
              },
              newNumber: N,
              handleNumberChange: function (e) {
                w(e.target.value);
              },
            }),
            c.a.createElement("h2", null, "Numbers"),
            c.a.createElement(m, {
              persons: t,
              searchName: J,
              handleDeletePerson: function (e, n) {
                window.confirm("Delete contact ".concat(n, "?")),
                  E(e).then(function () {
                    r(
                      t.filter(function (n) {
                        return n.id !== e;
                      })
                    );
                  });
              },
            })
          );
        };
      o.a.render(c.a.createElement(C, null), document.getElementById("root"));
    },
  },
  [[14, 1, 2]],
]);
//# sourceMappingURL=main.664c6e3b.chunk.js.map
