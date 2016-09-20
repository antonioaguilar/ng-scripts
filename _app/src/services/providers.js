/*
 * Copyright (c) 2016 Antonio Aguilar
 *
 * This software is provided "as is", without warranty of any kind, express or
 * implied, including but not limited to the warranties of merchantability,
 * fitness for a particular purpose and non-infringement. In no event shall the
 * authors or copyright holders be liable for any claim, damages or other
 * liability, whether in an action of contract, tort or otherwise, arising from,
 * out of or in connection with the software or the use or other dealings in this
 * software.
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */

var _providers = angular.module('app.providers', []);

_providers.provider('$env', function () {
  this.environment = 'development';
  this.data = {};

  this.config = function (config) {
    this.data = config;
  };

  this.set = function (environment) {
    this.environment = environment;
  };

  this.get = function () {
    return this.environment;
  };

  this.key = function (variable) {
    if ( variable !== 'all' ) {
      return this.data.vars[this.get()][variable];
    }

    return this.data.vars[this.get()];
  };

  this.is = function (environment) {
    return (environment === this.environment);
  };

  this.check = function () {
    var location = window.location.href, self = this;
    angular.forEach(this.data.domains, function (v, k) {
      angular.forEach(v, function (v) {
        if ( location.match(new RegExp('^http(s)?:\/\/' + v)) ) {
          self.environment = k;
        }
      });
    });
  };

  this.$get = function () {
    return this;
  };
});
