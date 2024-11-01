export class ApiResponse {
  constructor (data, statusCode = 200, message = "Success") {
    this.statusCode = statusCode;
    this.message = message;
    this.success = true;
    this.data = data;
  }
}