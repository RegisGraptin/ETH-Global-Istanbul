// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace SafetyfirstTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

  export type QuerySdk = {
      /** null **/
  disasterRegistered: InContextSdkMethod<Query['disasterRegistered'], QuerydisasterRegisteredArgs, MeshContext>,
  /** null **/
  disasterRegistereds: InContextSdkMethod<Query['disasterRegistereds'], QuerydisasterRegisteredsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  disasterRegistered: InContextSdkMethod<Subscription['disasterRegistered'], SubscriptiondisasterRegisteredArgs, MeshContext>,
  /** null **/
  disasterRegistereds: InContextSdkMethod<Subscription['disasterRegistereds'], SubscriptiondisasterRegisteredsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["safetyfirst"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
