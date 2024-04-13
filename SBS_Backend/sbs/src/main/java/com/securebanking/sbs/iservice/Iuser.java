package com.securebanking.sbs.iservice;

import com.securebanking.sbs.dto.UserDto;
import org.springframework.http.HttpStatus;

public interface Iuser {

    HttpStatus createOrUpdateUser(UserDto userDto);

    UserDto getUserById(Integer id);
//    Void createOrUpdateUser(UserDto userDto);
    public HttpStatus deactiveUser(Integer id);

    public HttpStatus activateUser(Integer id);

    public UserDto login(String username, String password) throws Exception;

    public HttpStatus register(UserDto userDto);
    public boolean generate(String email);
}
