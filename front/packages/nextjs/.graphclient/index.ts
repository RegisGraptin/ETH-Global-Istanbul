// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { SafetyfirstTypes } from './sources/safetyfirst/types';
import * as importedModule$0 from "./sources/safetyfirst/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type DisasterRegistered = {
  id: Scalars['Bytes'];
  disasterId: Scalars['String'];
  status: Scalars['Boolean'];
  disaster_category: Scalars['String'];
  disaster_location: Scalars['String'];
  disaster_evidence: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type DisasterRegistered_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  disasterId?: InputMaybe<Scalars['String']>;
  disasterId_not?: InputMaybe<Scalars['String']>;
  disasterId_gt?: InputMaybe<Scalars['String']>;
  disasterId_lt?: InputMaybe<Scalars['String']>;
  disasterId_gte?: InputMaybe<Scalars['String']>;
  disasterId_lte?: InputMaybe<Scalars['String']>;
  disasterId_in?: InputMaybe<Array<Scalars['String']>>;
  disasterId_not_in?: InputMaybe<Array<Scalars['String']>>;
  disasterId_contains?: InputMaybe<Scalars['String']>;
  disasterId_contains_nocase?: InputMaybe<Scalars['String']>;
  disasterId_not_contains?: InputMaybe<Scalars['String']>;
  disasterId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  disasterId_starts_with?: InputMaybe<Scalars['String']>;
  disasterId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  disasterId_not_starts_with?: InputMaybe<Scalars['String']>;
  disasterId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  disasterId_ends_with?: InputMaybe<Scalars['String']>;
  disasterId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  disasterId_not_ends_with?: InputMaybe<Scalars['String']>;
  disasterId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['Boolean']>;
  status_not?: InputMaybe<Scalars['Boolean']>;
  status_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  disaster_category?: InputMaybe<Scalars['String']>;
  disaster_category_not?: InputMaybe<Scalars['String']>;
  disaster_category_gt?: InputMaybe<Scalars['String']>;
  disaster_category_lt?: InputMaybe<Scalars['String']>;
  disaster_category_gte?: InputMaybe<Scalars['String']>;
  disaster_category_lte?: InputMaybe<Scalars['String']>;
  disaster_category_in?: InputMaybe<Array<Scalars['String']>>;
  disaster_category_not_in?: InputMaybe<Array<Scalars['String']>>;
  disaster_category_contains?: InputMaybe<Scalars['String']>;
  disaster_category_contains_nocase?: InputMaybe<Scalars['String']>;
  disaster_category_not_contains?: InputMaybe<Scalars['String']>;
  disaster_category_not_contains_nocase?: InputMaybe<Scalars['String']>;
  disaster_category_starts_with?: InputMaybe<Scalars['String']>;
  disaster_category_starts_with_nocase?: InputMaybe<Scalars['String']>;
  disaster_category_not_starts_with?: InputMaybe<Scalars['String']>;
  disaster_category_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  disaster_category_ends_with?: InputMaybe<Scalars['String']>;
  disaster_category_ends_with_nocase?: InputMaybe<Scalars['String']>;
  disaster_category_not_ends_with?: InputMaybe<Scalars['String']>;
  disaster_category_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  disaster_location?: InputMaybe<Scalars['String']>;
  disaster_location_not?: InputMaybe<Scalars['String']>;
  disaster_location_gt?: InputMaybe<Scalars['String']>;
  disaster_location_lt?: InputMaybe<Scalars['String']>;
  disaster_location_gte?: InputMaybe<Scalars['String']>;
  disaster_location_lte?: InputMaybe<Scalars['String']>;
  disaster_location_in?: InputMaybe<Array<Scalars['String']>>;
  disaster_location_not_in?: InputMaybe<Array<Scalars['String']>>;
  disaster_location_contains?: InputMaybe<Scalars['String']>;
  disaster_location_contains_nocase?: InputMaybe<Scalars['String']>;
  disaster_location_not_contains?: InputMaybe<Scalars['String']>;
  disaster_location_not_contains_nocase?: InputMaybe<Scalars['String']>;
  disaster_location_starts_with?: InputMaybe<Scalars['String']>;
  disaster_location_starts_with_nocase?: InputMaybe<Scalars['String']>;
  disaster_location_not_starts_with?: InputMaybe<Scalars['String']>;
  disaster_location_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  disaster_location_ends_with?: InputMaybe<Scalars['String']>;
  disaster_location_ends_with_nocase?: InputMaybe<Scalars['String']>;
  disaster_location_not_ends_with?: InputMaybe<Scalars['String']>;
  disaster_location_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  disaster_evidence?: InputMaybe<Scalars['String']>;
  disaster_evidence_not?: InputMaybe<Scalars['String']>;
  disaster_evidence_gt?: InputMaybe<Scalars['String']>;
  disaster_evidence_lt?: InputMaybe<Scalars['String']>;
  disaster_evidence_gte?: InputMaybe<Scalars['String']>;
  disaster_evidence_lte?: InputMaybe<Scalars['String']>;
  disaster_evidence_in?: InputMaybe<Array<Scalars['String']>>;
  disaster_evidence_not_in?: InputMaybe<Array<Scalars['String']>>;
  disaster_evidence_contains?: InputMaybe<Scalars['String']>;
  disaster_evidence_contains_nocase?: InputMaybe<Scalars['String']>;
  disaster_evidence_not_contains?: InputMaybe<Scalars['String']>;
  disaster_evidence_not_contains_nocase?: InputMaybe<Scalars['String']>;
  disaster_evidence_starts_with?: InputMaybe<Scalars['String']>;
  disaster_evidence_starts_with_nocase?: InputMaybe<Scalars['String']>;
  disaster_evidence_not_starts_with?: InputMaybe<Scalars['String']>;
  disaster_evidence_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  disaster_evidence_ends_with?: InputMaybe<Scalars['String']>;
  disaster_evidence_ends_with_nocase?: InputMaybe<Scalars['String']>;
  disaster_evidence_not_ends_with?: InputMaybe<Scalars['String']>;
  disaster_evidence_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DisasterRegistered_filter>>>;
  or?: InputMaybe<Array<InputMaybe<DisasterRegistered_filter>>>;
};

export type DisasterRegistered_orderBy =
  | 'id'
  | 'disasterId'
  | 'status'
  | 'disaster_category'
  | 'disaster_location'
  | 'disaster_evidence'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  disasterRegistered?: Maybe<DisasterRegistered>;
  disasterRegistereds: Array<DisasterRegistered>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerydisasterRegisteredArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydisasterRegisteredsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DisasterRegistered_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DisasterRegistered_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  disasterRegistered?: Maybe<DisasterRegistered>;
  disasterRegistereds: Array<DisasterRegistered>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptiondisasterRegisteredArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondisasterRegisteredsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DisasterRegistered_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DisasterRegistered_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  DisasterRegistered: ResolverTypeWrapper<DisasterRegistered>;
  DisasterRegistered_filter: DisasterRegistered_filter;
  DisasterRegistered_orderBy: DisasterRegistered_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  DisasterRegistered: DisasterRegistered;
  DisasterRegistered_filter: DisasterRegistered_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type DisasterRegisteredResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DisasterRegistered'] = ResolversParentTypes['DisasterRegistered']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  disasterId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  disaster_category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  disaster_location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  disaster_evidence?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  disasterRegistered?: Resolver<Maybe<ResolversTypes['DisasterRegistered']>, ParentType, ContextType, RequireFields<QuerydisasterRegisteredArgs, 'id' | 'subgraphError'>>;
  disasterRegistereds?: Resolver<Array<ResolversTypes['DisasterRegistered']>, ParentType, ContextType, RequireFields<QuerydisasterRegisteredsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  disasterRegistered?: SubscriptionResolver<Maybe<ResolversTypes['DisasterRegistered']>, "disasterRegistered", ParentType, ContextType, RequireFields<SubscriptiondisasterRegisteredArgs, 'id' | 'subgraphError'>>;
  disasterRegistereds?: SubscriptionResolver<Array<ResolversTypes['DisasterRegistered']>, "disasterRegistereds", ParentType, ContextType, RequireFields<SubscriptiondisasterRegisteredsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  DisasterRegistered?: DisasterRegisteredResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = SafetyfirstTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/safetyfirst/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const safetyfirstTransforms = [];
const additionalTypeDefs = [] as any[];
const safetyfirstHandler = new GraphqlHandler({
              name: "safetyfirst",
              config: {"endpoint":"https://api.studio.thegraph.com/query/4851/saferyfirst/v0.0.8"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("safetyfirst"),
              logger: logger.child("safetyfirst"),
              importFn,
            });
sources[0] = {
          name: 'safetyfirst',
          handler: safetyfirstHandler,
          transforms: safetyfirstTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: GetDisastersDocument,
        get rawSDL() {
          return printWithCache(GetDisastersDocument);
        },
        location: 'GetDisastersDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type getDisastersQueryVariables = Exact<{ [key: string]: never; }>;


export type getDisastersQuery = { disasterRegistereds: Array<Pick<DisasterRegistered, 'disasterId' | 'disaster_category' | 'disaster_location' | 'disaster_evidence'>> };


export const getDisastersDocument = gql`
    query getDisasters {
  disasterRegistereds(orderBy: disasterId, orderDirection: desc) {
    disasterId
    disaster_category
    disaster_location
    disaster_evidence
  }
}
    ` as unknown as DocumentNode<getDisastersQuery, getDisastersQueryVariables>;


export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    getDisasters(variables?: getDisastersQueryVariables, options?: C): Promise<getDisastersQuery> {
      return requester<getDisastersQuery, getDisastersQueryVariables>(getDisastersDocument, variables, options) as Promise<getDisastersQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;