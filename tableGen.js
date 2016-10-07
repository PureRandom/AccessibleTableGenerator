(function ($) {
    $(document).ready(function () {

        var rowMax = 10;
        var colMax = 10;
        var editing = false;

        $('.tableInfo').click(function (e) {
            $('.tableInfoContent').slideToggle();
            e.preventDefault();
        });

        $('.copyBtn').click(function (e) {
            var copyText = document.querySelector('.divResult');
            copyText.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                $('.alert-success').show();
                $('.alert-danger').hide();
            } catch (err) {
                $('.alert-danger').show();
                $('.alert-success').hide();
            }
            e.preventDefault();
        });

        function TableCreator() {
            //Generate Table creator
            var rowCnt = "<div>";
            for (var i = 0; i < colMax + 1; i++) {

                if (i != 0)
                    rowCnt += "<div>" + i + "</div>";
                else
                    rowCnt += "<div> &nbsp; </div>"

            }
            rowCnt += "</div>"

            $('.tableGen').append(rowCnt);

            for (var i = 1; i < rowMax + 1; i++) {

                var rowCnt = "<div>";

                for (var c = 0; c < colMax + 1; c++) {
                    if (c == 0)
                        rowCnt += "<div>" + i + "</div>";
                    else
                        rowCnt += "<div class='cellGen cellName_" + i + "_" + c + "' > &nbsp; </div>"
                }

                rowCnt += "</div>"

                $('.tableGen').append(rowCnt);

            }
            TableCtrls()
        };

        function TableCtrls() {

            $('.cellGen').on('click', function () {
                editing = !editing;
                highlightActive(this);
            })

            $('.cellGen').on('mouseover', function () {
                if (editing) {
                    highlightActive(this);
                }
            })

            function highlightActive(currentItem) {

                var itemClass = $(currentItem).attr('class').split(' ')[1].split('_');
                var currentRow = itemClass[1];
                var currentCol = itemClass[2];

                $('.cellGen').removeClass('active')

                for (var i = currentRow; i > 0; i--) {
                    for (var c = currentCol; c > 0; c--) {
                        $('.cellName_' + i + '_' + c).addClass('active');
                    }
                }

                $('.formRow').val(currentRow);
                $('.formCol').val(currentCol);
            }

        }

        TableCreator();

        $('.submitBtn').click(function () {

            var rowCount = $('.formRow').val();
            var colCount = $('.formCol').val();
            var tableType = $('.formType').val();


            var tableCtrl = "<table>";

            for (var i = 0; i < rowCount; i++) {

                tableCtrl += "<tr>";
                for (var c = 0; c < colCount; c++) {
                    var tableEl = "td";
                    switch (tableType) {
                        case "heading":
                            if (i == 0)
                                tableEl = "th";
                            break;
                        case "side":
                            if (c == 0)
                                tableEl = "th";
                            break;
                        case "headingside":
                            if (c == 0 || i == 0)
                                tableEl = "th";
                            break;
                        default:
                            tableEl = "td";
                    }

                    tableCtrl += "<" + tableEl + " class='cellItem_" + i + "_" + c + "' >" + "<textarea> </textarea>" + "</" + tableEl + ">";
                }
                tableCtrl += "</tr>";
            }

            tableCtrl += "</table>";

            $('.tableResult').html(tableCtrl);
            $('.genBtn').show();
        });

        $('.genBtn').click(function () {

            if ($('.formMarkup').val() == 'table') {
                tableTable();
            }
            else {
                divTable();
            };

            $('.divResulCtrl').show();

        });

        function tableTable() {

            var rowCount = $('.formRow').val();
            var colCount = $('.formCol').val();
            var tableType = $('.formType').val();

            var addThead = false;

            switch (tableType) {
                case "heading":
                    addThead = true;
                    break;
                case "side":
                    addThead = false;
                    break;
                case "headingside":
                    addThead = true;
                    break;
                default:
                    addThead = false;
            }

            var tableTable = "&lt;table class=&#39;int-table&#39;  &gt;" + " \n";

            tableTable += "&lt;caption&gt; " + $('.formCap').val() + " &lt;/caption&gt;" + " \n\n";

            for (var i = 0; i < rowCount; i++) {

                if (i == 0 && addThead)
                    tableTable += "&lt;thead&gt;" + " \n";
                else if (i == 0 || (i == 1 && addThead))
                    tableTable += "&lt;tbody&gt;" + " \n";

                tableTable += "&lt;tr class=&#39;int-tablerow&#39;  &gt;" + " \n";
                for (var c = 0; c < colCount; c++) {

                    var elRole = "";
                    var elName = "td";
                    switch (tableType) {
                        case "heading":
                            if (i == 0) {
                                elRole = "scope=&#39;col&#39;";
                                elName = "th";
                            }
                            break;
                        case "side":
                            if (c == 0) {
                                elRole = "scope=&#39;row&#39;";
                                elName = "th";
                            }
                            break;
                        case "headingside":
                            if (i == 0) {
                                elRole = "scope=&#39;col&#39;";
                                elName = "th";
                            }
                            else if (c == 0 && i != 0) {
                                elRole = "scope=&#39;row&#39;";
                                elName = "th";
                            }
                            break;
                        default:
                            elRole = "";
                    }

                    var cellContent = $('.cellItem_' + i + '_' + c + ' textarea').val();

                    tableTable += "&lt;" + elName + " " + elRole + " class=&#39;int-tablecell&#39; &gt; " + (cellContent.length < 1 ? "&nbsp;" : cellContent) + "&lt;/" + elName + "&gt;" + " \n";
                }
                tableTable += "&lt;/tr &gt;" + " \n";
                if (i == 0 && addThead)
                    tableTable += "&lt;/thead&gt;" + " \n";

            }

            tableTable += "&lt;/tbody&gt;" + " \n\n";

            tableTable += "&lt;/table&gt;" + " \n";

            $('.divResult').html(tableTable);
        }

        function divTable() {

            var rowCount = $('.formRow').val();
            var colCount = $('.formCol').val();
            var tableType = $('.formType').val();

            var divTable = "&lt;div class=&#39;int-table&#39; role=&#39;table&#39; &gt;" + " \n";

            divTable += "&lt;caption&gt; " + $('.formCap').val() + " &lt;/caption&gt;" + " \n\n";

            for (var i = 0; i < rowCount; i++) {
                divTable += "&lt;div class=&#39;int-tablerow&#39; role=&#39;row&#39; &gt;" + " \n";
                for (var c = 0; c < colCount; c++) {

                    var elRole = "gridcell";
                    switch (tableType) {
                        case "heading":
                            if (i == 0)
                                elRole = "columnheader";
                            break;
                        case "side":
                            if (c == 0)
                                elRole = "rowheader";
                            break;
                        case "headingside":
                            if (i == 0)
                                elRole = "columnheader";
                            else if (c == 0 && i != 0)
                                elRole = "rowheader";
                            break;
                        default:
                            elRole = "gridcell";
                    }

                    var cellContent = $('.cellItem_' + i + '_' + c + ' textarea').val();

                    divTable += "&lt;div role=&#39;" + elRole + "&#39; class=&#39;int-tablecell&#39; &gt; " + (cellContent.length < 1 ? "&nbsp;" : cellContent) + "&lt;/div&gt;" + " \n";
                }
                divTable += "&lt;/div &gt;" + " \n\n";
            }

            divTable += "&lt;/div&gt;" + " \n";

            $('.divResult').html(divTable);
        }

    });

})($);