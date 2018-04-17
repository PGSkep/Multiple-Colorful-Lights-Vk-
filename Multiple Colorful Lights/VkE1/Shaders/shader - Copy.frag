#version 450
#extension GL_ARB_separate_shader_objects : enable

struct PointLight
{
	vec3 position;
	float padding;
	vec3 color;
	float strenght;
};

layout(push_constant) uniform FragmentPushConstants
{
	layout(offset = 16)
	uint lightCount;
	uint lightIndex0;
	uint lightIndex1;
	uint lightIndex2;
	uint lightIndex3;
} pushConstants;

layout(binding = 2) uniform PointLights
{
	PointLight lights[4];
} pointLights;

layout(binding = 3) uniform sampler2D texSampler;

layout(location = 0) in vec2 inUV;
layout(location = 1) in vec3 inColor;
layout(location = 2) in vec3 inNormal;
layout(location = 3) in vec3 inTangent;
layout(location = 4) in vec3 inBitangent;

layout(location = 5) in vec3 inFragPos;
layout(location = 6) in vec3 inViewPos;
layout(location = 7) in vec3 inLightPos;

layout(location = 0) out vec4 outColor;

vec4 CalculateLight()
{
// to be external
	float ambientStrength = 0.25;
	float diffuseStrenght = 1.0;
	float specularStrength = 1.5;

	float specularRoughness = 512;
	
	vec3 ambientColor = vec3(0.0, 0.0, 1.0);
	vec3 diffuseColor = vec3(0.0, 1.0, 0.0);
	vec3 specularColor = vec3(1.0, 0.0, 0.0);

// precalc
	vec3 norm = normalize(inNormal);
	vec3 lightDir = normalize(inLightPos - inFragPos);
	vec3 viewDir = normalize(inViewPos - inFragPos);
	vec3 reflectDir = reflect(-lightDir, norm);  

	vec3 ambient = ambientStrength * ambientColor;
	vec3 diffuse = max(dot(norm, lightDir), 0.0) * diffuseColor * diffuseStrenght;
	vec3 specular = pow(max(dot(viewDir, reflectDir), 0.0), specularRoughness) * specularColor * specularStrength;

	return vec4(ambient + diffuse + specular, 1.0f);
}

void main()
{
	//outColor = vec4(0.0, 0.0, 0.0, 0.0);
	//{
	//	vec3 lightPos = pointLights.lights[pushConstants.lightIndex0].position;
	//	lightDir = normalize(lightPos - inFragPos);
	//	reflectDir = reflect(lightDir, norm); 
	//	
	//	diffuse2 = max(dot(norm, lightDir), 0.0) * diffuseStrenght;
	//	specular2 = pow(max(dot(viewDir, reflectDir), 0.0), specularRoughness) * specularStrength;
	//
	//	outColor += vec4(pointLights.lights[pushConstants.lightIndex0].color, 1.0f) * diffuse2 + specular2;
	//}
	//{
	//	vec3 lightPos = pointLights.lights[pushConstants.lightIndex1].position;
	//	lightDir = normalize(lightPos - inFragPos);
	//	reflectDir = reflect(lightDir, norm); 
	//	
	//	diffuse2 = max(dot(norm, lightDir), 0.0) * diffuseStrenght;
	//	specular2 = pow(max(dot(viewDir, reflectDir), 0.0), specularRoughness) * specularStrength;
	//
	//	outColor += vec4(pointLights.lights[pushConstants.lightIndex1].color, 1.0f) * diffuse2 + specular2;
	//}
	//{
	//	vec3 lightPos = pointLights.lights[pushConstants.lightIndex2].position;
	//	lightDir = normalize(lightPos - inFragPos);
	//	reflectDir = reflect(lightDir, norm); 
	//	
	//	diffuse2 = max(dot(norm, lightDir), 0.0) * diffuseStrenght;
	//	specular2 = pow(max(dot(viewDir, reflectDir), 0.0), specularRoughness) * specularStrength;
	//
	//	outColor += vec4(pointLights.lights[pushConstants.lightIndex2].color, 1.0f) * diffuse2 + specular2;
	//}
	//{
	//	vec3 lightPos = pointLights.lights[pushConstants.lightIndex3].position;
	//	lightDir = normalize(lightPos - inFragPos);
	//	reflectDir = reflect(lightDir, norm); 
	//	
	//	diffuse2 = max(dot(norm, lightDir), 0.0) * diffuseStrenght;
	//	specular2 = pow(max(dot(viewDir, reflectDir), 0.0), specularRoughness) * specularStrength;
	//
	//	outColor += vec4(pointLights.lights[pushConstants.lightIndex3].color, 1.0f) * diffuse2 + specular2;
	//}

	//outColor = vec4(ambient + diffuse + specular, 1.0f);

	outColor = CalculateLight();
}