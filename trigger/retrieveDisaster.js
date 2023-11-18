
const apiResponse = await Functions.makeHttpRequest({
    url: `https://api.reliefweb.int/v1/disasters?appname=rwint-user-0&profile=list&preset=latest&slim=1`,
});
if (apiResponse.error) {
    throw Error("Request failed");
}
const { data } = apiResponse.data;
const firstItem = data[0];
const name = firstItem.fields.name;
console.log(name)

return Functions.encodeString(name);    

