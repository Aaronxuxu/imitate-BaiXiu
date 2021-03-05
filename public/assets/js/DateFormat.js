function dateFormat(data) {
    let year = data.substr(0, 4);
    let month = data.substr(5, 2);
    let day = data.substr(8, 2);
    return year + '年' + month + '月' + day + '号'
};
template.defaults.imports.dateFormat = dateFormat;