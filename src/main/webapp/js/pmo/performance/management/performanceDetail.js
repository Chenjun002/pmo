$(function(){
	loadPerforDetail();
})

function loadPerforDetail(){
	$.ajax({
		url:path+"/service/performanceManageEva/detailData/"+$("#reemployeeid").val(),
		dataType:"json",
		async:true,
		cache:false,
		type:"post",
		success:function(result){
			$("#ehr").val(result.ehr);
			$("#staffname").val(result.staffname);
			$("#du").val(result.department);
			$("#position").val(result.role);
			$("#assessmentSupervisor").val(result.assessmentSupervisor);
			//RM对员工填写的绩效目标审批意见
			$("#perSettingComments").val(result.processcomments);
			//console.log("data==" + JSON.stringify(result));
			if(result.state=="2"){
				document.getElementById("Reject").setAttribute("disabled", true);
				document.getElementById("Approve").setAttribute("disabled", true);
				document.getElementById("perSettingComments").setAttribute("disabled", true);
			}
			for(var i = 0; i < result.data.length; i++){
				if(result.data[i].type == "0"){
					loadPriorityWork(result);
	            }
				if(result.data[i].type == "1"){
					loadKeyEvents(result);
				}
			}
			loadEmployeePlan(result);
			document.getElementById("button1").setAttribute("disabled", 'disabled');
			document.getElementById("button2").setAttribute("disabled", 'disabled');
			document.getElementById("button3").setAttribute("disabled", 'disabled');
		}
	})
}

//加载重点工作数据
function loadPriorityWork(result){
	$("#table1 tbody").remove();
	var tbody = $("<tbody>");
	tbody.appendTo($("#table1"));
	for (var i = 0; i < result.data.length; i++) {
		if(result.data[i].type == "0"){
			var tr1 = $("<tr id='tr1'></tr>");
			tr1.appendTo(tbody);
		}
	if(result.data[i].type == "0"){
		var td1 = $("<td id='tx1'>重点工作</td>");
		
		var td2 = $("<td name='index'>"
				+ result.data[i].index
				+ "</td>");
		var td3 = $("<td name='description'>"
				+ result.data[i].description
				+ "</td>");
		var td4 = $("<td name='weightrate'>"
				+ result.data[i].weightrate
				+ "</td>");
		var td5 = $("<td name='phasegoal'>"
				+ result.data[i].phasegoal
				+ "</td>");
		var td6 = $("<td name='keyaction'> "
				+ result.data[i].keyaction
				+ "</td>");
		var td7 = $("<td>"
				+ result.data[i].department
				+ "</td>");
		
		td1.appendTo(tr1);
		td2.appendTo(tr1);
		td3.appendTo(tr1);
		td4.appendTo(tr1);
		td5.appendTo(tr1);
		td6.appendTo(tr1);
		td7.appendTo(tr1);

	}}
//	var tr2 = $("<tr id='tr2' ></tr>");
//	tr2.appendTo(tbody);
////	var td = $("<td></td>");
////	td.appendTo(tr2);
//	var td1 = $("<td colspan='8'></td>");
//	td1.appendTo(tr2);
//	var href =$("<button id='button1' href=\"javascript:void(0);\" class=\"btn btn-info btn-sm\" onclick=\"addTr1(\'table1\', -1, 7);\")>"+"<span class='glyphicon glyphicon-plus'></span>Add"+"</button>"); 
//	href.appendTo(td1);
	
	$("#table1").append("</tbdoy>");
}

//加载关键事件数据
function loadKeyEvents(result){
	$("#table2 tbody").remove();
	var tbody = $("<tbody>");
	tbody.appendTo($("#table2"));
	for (var i = 0; i < result.data.length; i++) {
		if(result.data[i].type == "1"){
			var tr1 = $("<tr id='tr1'></tr>");
			tr1.appendTo(tbody);
		}
	if(result.data[i].type == "1"){
		var td1 = $("<td style='width:153px;' id='tx1'>关键事件</td>");
		
		var td2 = $("<td style='width:97px;' name='index'>"
				+ result.data[i].index
				+ "</td>");
		var td3 = $("<td style='width:208px;' name='description'>"
				+ result.data[i].description
				+ "</td>");
		var td4 = $("<td style='width:97px;' name='weightrate'>"
				+ result.data[i].weightrate
				+ "</td>");
		var td5 = $("<td style='width:153px;' name='phasegoal'>"
				+ result.data[i].phasegoal
				+ "</td>");
		var td6 = $("<td style='width:153px;' name='keyaction'> "
				+ result.data[i].keyaction
				+ "</td>");
		var td7 = $("<td>"
				+ result.data[i].department
				+ "</td>");
		
		td1.appendTo(tr1);
		td2.appendTo(tr1);
		td3.appendTo(tr1);
		td4.appendTo(tr1);
		td5.appendTo(tr1);
		td6.appendTo(tr1);
		td7.appendTo(tr1);

	}}
//	var tr2 = $("<tr id='tr2' ></tr>");
//	tr2.appendTo(tbody);
////	var td = $("<td></td>");
////	td.appendTo(tr2);
//	var td1 = $("<td colspan='7'></td>");
//	td1.appendTo(tr2);
//	var href =$("<button id='button2' href=\"javascript:void(0);\" class=\"btn btn-info btn-sm\" onclick=\"addTr3(\'table2\', -1, 7);\")>"+"<span class='glyphicon glyphicon-plus'></span>Add"+"</button>"); 
//	href.appendTo(td1);
	
	$("#table2").append("</tbdoy>");
}

//加载个人能力提升计划数据
function loadEmployeePlan(result){
	$("#table3 tbody").remove();
	
	var tbody = $("<tbody>");
	tbody.appendTo($("#table3"));
	for (var i = 0; i < result.plan.length; i++) {
		var tr = $("<tr id='tr1'></tr>");
		tr.appendTo(tbody);

		var td1 = $("<td name='keyability'>"
				+ result.plan[i].keyability
				+ "</td>");
		var td2 = $("<td name='action'>"
				+ result.plan[i].action
				+ "</td>");
		var td3 = $("<td name='supportor'>"
				+ result.plan[i].supportor
				+ "</td>");
		var td4 = $("<td name='dealine'>"
				+ result.plan[i].dealineString
				+ "</td>");
		
		td1.appendTo(tr);
		td2.appendTo(tr);
		td3.appendTo(tr);
		td4.appendTo(tr);

	}
//	var tr2 = $("<tr id='tr2' ></tr>");
//	tr2.appendTo(tbody);
//	var td1 = $("<td colspan='4'></td>");
//	td1.appendTo(tr2);
//	var href =$("<button id='button3' href=\"javascript:void(0);\" class=\"btn btn-info btn-sm\" onclick=\"addTr2(\'table3\', -1, 4);\")>"+"<span class='glyphicon glyphicon-plus'></span>Add"+"</button>"); 
//	href.appendTo(td1);
	$("#table3").append("</tbdoy>");	
}

//审批不通过
function reject(){
	var comments = $("#perSettingComments").val();
	$.ajax({
		url:path+"/service/empPerforGoal/reject/"+$("#reemployeeid").val(),
		dataType:"json",
		async:true,
		cache:false,
		type:"post",
		data:{comments:comments},
		success:function(result){
			if(result.code=="1"){
				alert(result.msg);
				window.location.href=path+"/service/performance/performanceManageTargetApproval";
			}else{
				alert(result.msg);
			}
		}
	})
}

//审批通过
function approval(){
	var comments = $("#perSettingComments").val();
	$.ajax({
		url:path+"/service/empPerforGoal/approval/"+$("#reemployeeid").val(),
		dataType:"json",
		async:true,
		cache:false,
		type:"post",
		data:{comments:comments},
		success:function(result){
			if(result.code=="1"){
				alert(result.msg);
				window.location.href=path+"/service/performance/performanceManageTargetApproval";
			}else{
				alert(result.msg);
			}
		}
	})
}

