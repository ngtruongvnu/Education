package akadon;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@ComponentScan
public class UploadFileConfig implements WebMvcConfigurer{
	@Value("${akadon.upload.dir}")
	private String akadonUploadDir;
	
	@Value("${akadon.url.prefix}")
	private String akadonUrlPrefix;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/"+akadonUrlPrefix+"/**")
			.addResourceLocations("file:"+akadonUploadDir+"/");
	}
}
