function uiLoader(option) {
switch(option)
{
	case "homePage": 
	$("#bodyContent").show(100);
	$("#logWork").hide(100);
	$("#editTask").hide(100);
	$("#createNewTask").hide(100);
	break;

	case "createNewTask": 
	$("#bodyContent").hide(100);
	$("#logWork").hide(100);
	$("#editTask").hide(100);
	$("#createNewTask").show(100);
	break;

	case "backToMainFromCreateNewTask": 
	$('#createNewTask').hide(100);
	$("#logWork").hide(100);
	$("#editTask").hide(100);
    $("#bodyContent").show(100);
	break;

	case "submitNewTask": 
	$("#createNewTask").hide(100);
	$("#bodyContent").show(100);
	$("#logWork").hide(100);
	$("#editTask").hide(100);
	break;

	case "submitLogWork": 
	$("#createNewTask").hide(100);
	$("#bodyContent").show(100);
	$("#logWork").hide(100);
	$("#editTask").hide(100);
	break;

	case "submitEditTask": 
	$("#createNewTask").hide(100);
	$("#bodyContent").show(100);
	$("#logWork").hide(100);
	$("#editTask").hide(100);
	break;

	case "editTask": 
	$("#editTask").hide(100);
	$("#bodyContent").show(100);
	$("#logWork").hide(100);
	$("#createNewTask").hide(100);
	break;

	case "backToMainFromEditTask","backToMainFromLogWork": 
	$('#createNewTask').hide(100);
	$("#logWork").hide(100);
	$("#editTask").hide(100);
    $("#bodyContent").show(100);
	break;

	case "logWork":
	$("#logWork").show(100);
	$("#bodyContent").hide(100);
	$("#createNewTask").hide(100);
	$("#editTask").hide(100);
	break;

	case "allTask": break;

	default:$("#404").show(100);
}
}