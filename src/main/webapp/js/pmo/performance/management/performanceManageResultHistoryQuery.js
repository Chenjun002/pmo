$(function() {
	loadManageResultHistoryQueryList();

});

function loadManageResultHistoryQueryList() {
	var queryUrl = path + '/service/performanceManageResultHistory/queryManageResultHistoryQueryList';
	var table = $('#manageResultHistoryQueryList').bootstrapTable({
		url : queryUrl, // 请求后台的URL（*）
		method : 'GET', // 请求方式（*）
		fixedColumns: true,
        fixedNumber: 5,
		// toolbar: '#toolbar', //工具按钮用哪个容器
		striped : true, // 是否显示行间隔色
		cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination : true, // 是否显示分页（*）
		sortable : true, // 是否启用排序
		sortOrder : "asc", // 排序方式
		sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
		pageNumber : 1, // 初始化加载第一页，默认第一页,并记录
		pageSize : 10, // 每页的记录行数（*）
		pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
		search : false, // 是否显示表格搜索
		strictSearch : false,
		showColumns : false, // 是否显示所有的列（选择显示的列）
		// showRefresh: true, //是否显示刷新按钮
		minimumCountColumns : 2, // 最少允许的列数
		clickToSelect : true, // 是否启用点击选中行
		// height : 500, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		uniqueId : "id", // 每一行的唯一标识，一般为主键列
		showToggle : false, // 是否显示详细视图和列表视图的切换按钮
		cardView : false, // 是否显示详细视图
		detailView : false, // 是否显示父子表
		singleSelect : false, // 禁止多选_____
		// 得到查询的参数
		queryParams : function(params) {
			//console.log(params);
			// 获取查询条件
			var eHr = $("#eHr").val();
			var staffName = $("#staffName").val();
			var bu = $("#bu").val();
			var du = $("#du").val();
			var startYear = $("#startYear").val();
			var startQuarter = $("#startQuarter").val();
			var endYear = $("#endYear").val();
			var endQuarter = $("#endQuarter").val();
			return {
				pageSize : params.limit,
				pageNumber : params.offset / params.limit + 1,
				eHr : eHr,
				staffName : staffName,
				bu : bu,
				du : du,
				startYear : startYear,
				startQuarter : startQuarter,
				endYear : endYear,
				endQuarter : endQuarter
			};
		},
		columns : 
		[ 
			{
			  title : 'No',
			  sortable : true,
			  formatter : function(value, row, index) {
				 return index+1;
			  }
		    },
		    {
		      field : 'operation',
		      title : 'Detail',
		      formatter : function(value,row, index){
	                return "<a onclick='detail(\"" + row.employee_id + "\",\"" + row.year + "\",\"" + row.quarter + "\")' href='#' class='btn btn-info btn-sm'>"+
	                "<span></span> Detail"+
	              "</a>";
	          }
		    }, 
		    {
			  field : 'ehr',
			  title : 'E-HR'
		    },
		    {
			  field : 'name',
			  title : 'Name',
			  width:80
		    }, 
		    {
			  field : 'bu',
			  title : 'BU',
			  width:215,
			  formatter: function(value, row, index){
				  return '<span style="font-size:9px">'+value+'</span>';
			  }
		    }, 
		    {
			  field : 'du',
			  title : 'DU',
			  width:175,
			  formatter: function(value, row, index){
				  return '<span style="font-size:9px">'+value+'</span>';
			  }
		    }, 
		   {
			  field : 'beginDate',
			  title : 'Begin Date',
			  width:120,
			  formatter : function(value, row, index) {
				 if (row.quarter == "1") {
					return row.year + "/01/01";
				 } else if (row.quarter == "2") {
					return row.year + "/04/01";
				 } else if (row.quarter == "3") {
					return row.year + "/07/01 ";
				 } else if (row.quarter == "4") {
					return row.year + "/10/01";
				 }
			  }
		    }, 
		    {
			  field : 'endDate',
			  title : 'End Date',
			  width:120,
			  formatter : function(value, row, index) {
				 if (row.quarter == "1") {
					return row.year + "/03/31";
				 } else if (row.quarter == "2") {
					return row.year + "/06/30";
				 } else if (row.quarter == "3") {
					return row.year + "/09/30";
				 } else if (row.quarter == "4") {
					return row.year + "/12/31";
				 }
			   }
		    },
		    {
			  field : 'rm',
			  title : 'RM',
			  width:100
		    }, 
		    {
			  field : 'result',
			  title : 'Result',
			  width:80
		    }, 
		    {
			  field : 'resultComments',
			  title : 'Remark',
			  width:165,
			  formatter: function(value, row, index){
				  return '<span style="font-size:9px">'+value+'</span>';
			  }
		} ],
		onLoadSuccess : function(sta) {
//			console.log("in onLoadSuccess");
//			console.log(JSON.stringify(sta));
			loadCSSubDept(sta);
		},
		onLoadError : function(status, res) { // 加载失败时执行
//			console.log(res);
//			console.log("error.status:" + status);
		},
		onDblClickRow : function(row, $element) {

		}
	});
}

function search() {
	// 获取查询条件
	var eHr = $("#eHr").val();
	var staffName = $("#staffName").val();
	var bu = $("#bu").val();
	var du = $("#du").val();
	if(!du){
		var duOptions = $("#csSubDept option:selected");
		du = duOptions.val();
	}
	var startYear = $("#startYear").val();
	var startQuarter = $("#startQuarter").val();
	var endYear = $("#endYear").val();
	var endQuarter = $("#endQuarter").val();
	var queryParams = {
		query : {
			eHr : eHr,
			staffName : staffName,
			bu : bu,
			du : du,
			startYear : startYear,
			startQuarter : startQuarter,
			endYear : endYear,
			endQuarter : endQuarter
		}
	}
	// 刷新表格
//	$('#manageResultHistoryQueryList').bootstrapTable('refreshOptions', {
//		pageSize : 10,
//		pageNumber : 1
//	});
	 $('#manageResultHistoryQueryList').bootstrapTable('refresh',
	 queryParams);
}
function detail(employeeId,year,quarter) {
	window.location.href = path+"/service/performanceManageEva/historyPerforDetailPage/"+employeeId+"/"+quarter+"/"+year;
}

/** 历史绩效导出 * */
function historyResultExport() {
	var tableData = $('#manageResultHistoryQueryList').bootstrapTable("getData");
	if (tableData.length == 0) {
		alert("暂无数据导出");
		return;
	}
	$("#downloadForm").remove();
	var url = path + '/service/performanceManageResultHistory/result/export';
	var $eleForm = $("<form method='post'></form>");
	$eleForm.attr("id", "downloadForm");
	$eleForm.attr("style", "display:none");
	$eleForm.attr("action", url);
	$eleForm.append($("#searchPanel").clone());
	$(document.body).append($eleForm);
	$eleForm.submit();// 提交表单，实现下载
}

/** clear * */
function clearParams() {
	$("#eHr").val("");
	$("#staffName").val("");
	//$("#bu").val("");
	//$("#du").val("");
	$("#startYear").val("2010");
	$("#startQuarter").val("Q1");
	$("#endYear").val("2018");
	$("#endQuarter").val("Q4");
}


/*
 * add DU list
 */
var allCSSubDept;
function loadCSSubDept(result){
	var userType = result.user.userType;
	var csSubDeptNames = result.csSubDeptNames;
	$.ajax({
		url:path+'/service/csDept/queryAllCSSubDeptName',
		dataType:"json",
		async:true,
		cache:false,
		type:"post",
		success:function(list){
			allCSSubDept= list;
			$("#csSubDept").empty();
			$("#csSubDept").append("<option value=''>--Option--</option>");
			for(var i = 0;i<list.length;i++){
				$("#csSubDept").append("<option>"+list[i].csSubDeptName+"</option>");
			}
			
			if(userType=='3' || userType=='4' || userType=='5'){
				if(csSubDeptNames.length==1){
					$('#csSubDept').val(result.csSubDeptNames[0]);
					$("#csSubDept").attr("disabled","disabled");
				}else if(csSubDeptNames.length>1){
					$("#csSubDept").empty();
					for(var i = 0;i<csSubDeptNames.length;i++){
						$("#csSubDept").append("<option>"+csSubDeptNames[i]+"</option>");
						//$('#csSubDept').val(result.pageInfo.csSubDeptName);
					}
				}
			}else{
				//$('#csSubDept').val(result.pageInfo.csSubDeptName);
				
			}
		}
	})
}



