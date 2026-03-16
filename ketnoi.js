// File: ketnoi.js
const API_URL = "https://script.google.com/macros/s/AKfycbzuvwPLKjGmcxqtwsur2h9GLJMsG0vayOcnTxgeiaZT0shYWhaj6dO__WGmGKV93HE3/exec";

const google = {
  script: {
    run: {
      successHandler: null,
      failureHandler: null,
      withSuccessHandler: function(handler) {
        this.successHandler = handler;
        return this;
      },
      withFailureHandler: function(handler) {
        this.failureHandler = handler;
        return this;
      },
      // Hàm điều hướng chung để gọi sang Google Apps Script
      callServer: function(functionName, args) {
        const params = {
          method: 'POST',
          body: JSON.stringify({
            functionName: functionName,
            args: args
          })
        };
        
        fetch(API_URL, params)
          .then(response => response.json())
          .then(res => {
            if (res.error && this.failureHandler) {
              this.failureHandler(res.error);
            } else if (this.successHandler) {
              this.successHandler(res.data);
            }
          })
          .catch(err => {
            if (this.failureHandler) this.failureHandler(err);
          });
      },
      // Các hàm cụ thể ánh xạ từ cd_code.txt
      CD_getSubFolders: function() { this.callServer('CD_getSubFolders', []); },
      CD_uploadMultipleFilesToDrive: function(fData, fId, oldUrl, wMode) { this.callServer('CD_uploadMultipleFilesToDrive', [fData, fId, oldUrl, wMode]); },
      CD_uploadFolderEvidence: function(fId, fName, fData, oldUrl, wMode) { this.callServer('CD_uploadFolderEvidence', [fId, fName, fData, oldUrl, wMode]); },
      CD_deleteEvidence: function(url) { this.callServer('CD_deleteEvidence', [url]); },
      CD_doBatchUpdate: function(dataList) { this.callServer('CD_doBatchUpdate', [dataList]); },
      CD_searchLuong: function(filter) { this.callServer('CD_searchLuong', [filter]); },
      CD_searchThamNien: function(filter) { this.callServer('CD_searchThamNien', [filter]); },
      CD_getUserContext: function(email) { this.callServer('CD_getUserContext', [email]); },
      CD_hasDrivePermission: function() { this.callServer('CD_hasDrivePermission', []); }
    }
  }
};