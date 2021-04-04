import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Article } from '../article';
import { User, UserRole } from '../user';

@Injectable()
export class AbilityFactory {
  createForUser(user?: User): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    if (!user) {
      can('readAny', Article);
      can('read', Article);
    } else if (user.role === UserRole.AUTHOR) {
      can('readAny', Article);
      can('read', Article);
      can('create', Article);
      can<FlatArticle>('update', Article, {
        'author.id': user.id,
      });
      can<FlatArticle>('delete', Article, {
        'author.id': user.id,
      });
    }

    return build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<Abilities>,
    });
  }
}

type Action = 'manage' | 'readAny' | 'read' | 'create' | 'update' | 'delete';
type Abilities =
  | [Action, 'all']
  | ['read', InferSubjects<typeof User>]
  | [Action, InferSubjects<typeof Article>];
export type AppAbility = Ability<Abilities>;

type FlatArticle = {
  id: string;
  'author.id': string;
};
