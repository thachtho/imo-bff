import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../common/http-client/http-client';
import { CON_FIG } from '../../../../conf/config';

@Injectable()
export class RoleControlService {
  private roleControlHost: null | string;

  constructor(private readonly httpClientService: HttpClientService) {
    this.roleControlHost = CON_FIG.request.roleControlService;
  }

  getRoleControlOfUser(roleId: number) {
    return this.httpClientService.get$<any>(
      `${this.roleControlHost}/role-control?roleId=${roleId}`,
    );
  }
}
