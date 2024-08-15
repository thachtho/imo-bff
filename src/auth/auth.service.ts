import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.userClient.subscribeToResponseOf('IMO-AUTH');
  }
  login(): Observable<any> {
    return this.userClient
      .send(
        'IMO-AUTH',
        JSON.stringify({
          eventName: 'auth-login',
          data: {
            email: 'admin@gmail.com',
            password: '111111',
          },
        }),
      )
      .pipe(
        catchError((error) => {
          // Xử lý lỗi tại đây, ví dụ như log lỗi hoặc phát ra lỗi HTTP cho client
          console.error('Error occurred:', error);
          throw error; // hoặc return throwError(error); nếu bạn muốn truyền tiếp lỗi
        }),
      );
  }
}
