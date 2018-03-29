package com.pmo.dashboard.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pmo.dashboard.entity.CandidateInterview;
import com.pmo.dashboard.entity.CandidatePush;
import com.pmo.dashboard.entity.User;
import com.pmo.dashboard.util.Utils;
import com.pom.dashboard.service.RmCandidateService;
import com.pom.dashboard.service.UserService;


/**
 * 用户相关
 * @author Devin
 * @since 2018-1-2
 * @version 1.0
 */
@Controller
@RequestMapping(value="user")
public class UserRelevantController {
	
	@SuppressWarnings("unused")
	private static Logger logger = LoggerFactory
            .getLogger(UserRelevantController.class);
	
	@Resource
    private UserService userService;
	
	@Resource
	private RmCandidateService rmCandidateService;
	
	ObjectMapper objectMapper = new ObjectMapper();  
	
	/**
	 * 添加页面
	 * @author Devin
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping("/addUserPage")
    public String addUserPage(final HttpServletRequest request,
            final HttpServletResponse response,Model model)
    {
        return "user/addUser";
    }
	
	/**
	 * 添加用户
	 * @author Devin
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/addUser")
    @ResponseBody
    public boolean addUser(final HttpServletRequest request,
            final HttpServletResponse response)
    {
        
        String userId = Utils.getUUID(); 
        String eHr = request.getParameter("eHr");
        String name = request.getParameter("name");
        String type = request.getParameter("type");
        String bu = request.getParameter("bu");
        String du = request.getParameter("du");
        
        boolean resultFlag = false;
        //字段校验
        if(checkField(eHr,name,type,bu,du)){
        	User user = new User(userId,eHr,name,"123", type, bu.substring(0, bu.length()-1), du.substring(0, du.length()-1),"0");
            try{
                resultFlag = userService.addUser(user);
            }catch(Exception e){
            	e.printStackTrace();
            }
            return resultFlag;
        }
        return resultFlag;
    }
	
	/**
	 * 获取HR
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/getHR")
	@ResponseBody
    public List<User> getHR(final HttpServletRequest request,
            final HttpServletResponse response,Model model)
    {
		try{
			String puid = request.getParameter("puid");
			List<CandidatePush> pushuser = null;
			List<User> list = null;
			if(puid!=null && !"".equals(puid)){
				pushuser = rmCandidateService.getPushUser(puid);
			}
			if(pushuser!=null && pushuser.size()>0){
				list = userService.getHR(pushuser.get(0).getPushUserId());
			}else{
				list = userService.getHR("");
			}
		    @SuppressWarnings("rawtypes")
			Map map = new HashMap();
		    map.put("data", list);
			return list;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
    }
	
	/**
	 * 获取RM
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/getRM")
	@ResponseBody
    public List<User> getRM(final HttpServletRequest request,
            final HttpServletResponse response,Model model)
    {
		try{
			String canid = request.getParameter("canid");
			String csdeptid = request.getParameter("csdeptid");
			CandidateInterview civ = null;
			List<User> list = null;
			//通过canid获取推送到的部门
			if(canid!=null && !"".equals(canid)){
				civ = rmCandidateService.getIntervieInfo(canid);
			}
			//通过推送到的部门获取对应部门RM
			Map<String,Object> param = new HashMap<String,Object>();
			if(civ!=null){
				param.put("csdeptID", civ.getCssubDept());
				param.put("rmtype", 5);
			}else{
				param.put("rmtype", 5);
			}
			if(csdeptid!=null && !"".equals(csdeptid)){
				param.put("csdeptID", csdeptid);
			}
			list = userService.getUser(param);
		    @SuppressWarnings("rawtypes")
			Map map = new HashMap();
		    map.put("data", list);
			return list;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
    }
	
	/**
	 * 校验Ehr
	 * @author Devin
	 * @param eHr
	 * @return
	 */
	@RequestMapping("/checkEhr")
	@ResponseBody
	public String checkUser(String eHr){
		boolean result = true;
		User user = userService.checkUser(eHr);
		if(user!=null){
			result = false;
		}
		Map<String, Boolean> map = new HashMap<>();
        map.put("valid", result);
        ObjectMapper mapper = new ObjectMapper();
        String resultString = "";
        try {
            resultString = mapper.writeValueAsString(map);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return resultString;
	}
	
	/**
	 * 保存用户时字段校验
	 * @author Devin
	 * @param field
	 * @return
	 */
	private boolean checkField(String eHr,String name,String type,String bu,String du){
		if(eHr == null || "".equals(eHr)){
			return false;
		}
		if(name == null || "".equals(name)){
			return false;
		}
		if(type == null || "".equals(type)){
			return false;
		}
		if(bu == null || "".equals(bu)){
			return false;
		}
		if(du == null || "".equals(du)){
			return false;
		}
		return true;
	}

}
