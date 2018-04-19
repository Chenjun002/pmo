package com.pmo.dashboard.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.pmo.dashboard.entity.OfflineOper;
import com.pmo.dashboard.entity.User;
import com.pom.dashboard.service.CSDeptService;
import com.pom.dashboard.service.EmployeeService;
import com.pom.dashboard.service.OfflineOperService;

@Controller
@RequestMapping(value="/offlineOper")
public class OfflineOperController {
	private static Logger logger = LoggerFactory
            .getLogger(OfflineOperController.class);
	private ObjectMapper objectMapper = new ObjectMapper();  
	
	@Resource
	private OfflineOperService offlineOperService;
	
	@Resource
	private CSDeptService csDeptService;
	
	@Resource
    private EmployeeService employeeService;
	
	/**
	 * 返回数据
	 * @param request
	 * @param response
	 * @return
	 * @throws JsonProcessingException
	 */
	@RequestMapping("/query")
	@ResponseBody
	public Object query(int pageSize,int pageNumber,OfflineOper condition,HttpServletRequest request) throws JsonProcessingException{
		//第一个参数当前页码，第二个参数每页条数
		PageHelper.startPage(pageNumber,pageSize);  
//		OfflineOper condition = new OfflineOper();
//		condition
		
		User user = (User) request.getSession().getAttribute("loginUser");
		
		List<OfflineOper> list = offlineOperService.query(condition,user);
		
		PageInfo<OfflineOper> page = new PageInfo(list);
		Map<String,Object> map = new HashMap<String,Object>();
		Map<String,Object> param = new HashMap<String,Object>();
		
//		map.put("page",page);
//        map.put("list",list);
//		map.put("condition", condition);
//		return objectMapper.writeValueAsString(map);
		map.put("total", page.getTotal());
		map.put("rows", page.getList());
		return map;
	}
}
