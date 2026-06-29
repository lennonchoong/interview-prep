# C++ Directory Checklist

Total notes: **363**


## Algorithms & Data Structures


### Graph Algorithms

- [x] Bellman-Ford
- [x] Binary Lifting
- [x] Dijkstra's
- [x] Kosaraju's
- [x] Topological Sorting
- [x] Union Find

### Probabilistic Data Structures

- [x] Approximate Quantiles
- [x] Bloom Filter
- [x] Count-Min Sketch
- [x] HyperLogLog

### Range Queries

- [x] Binary Indexed Tree
- [x] Segment Tree

### String Algorithms

- [x] KMP String Matching
- [x] String Hashing & Rolling Hash

## C++


### Algorithms

- [x] STL Algorithms

### Bit Manipulation

- [x] Bit Manipulation & bitset

### Building

- [x] Build Process
- [x] inline, Linkage & ODR

### Classes

- [x] Copy Elision & RVO
- [x] Initialisation & Constructors
- [x] Move semantics
- [x] Rule of 1, 3 & 5

### Code Examples

- [x] std expected
- [x] std function
- [x] std optional

### Compile-Time

- [x] constexpr, consteval & constinit

### Concurrency


#### Design

- [x] Amdahl's Law
- [x] Avoiding Deadlocks
- [x] Data Initialisation
- [x] Exception Safety
- [x] Performance
- [x] Thread Safety in returning values

##### Lock Free Design

- [x] Hazard Pointers
- [x] Non-Blocking Data Structures
- [x] Reference Counting
- [x] SPSC Ring Buffer

##### Threadpool

- [x] Avoiding Contention & Work Stealing
- [x] Interruptible Condition Variables
- [x] Interruptible Tasks
- [x] Tasks Waiting on other Tasks
- [x] Waitable Tasks

#### Primitives


##### Atomics

- [x] Atomic Types
- [x] CAS Weak vs Strong
- [x] Fences
- [x] Happens Before Relationship
- [x] Hardware Interaction
- [x] Memory Ordering & Model With Atomics
- [x] Read Modify Write Operations
- [x] Synchronises With Relationship

###### Memory Ordering Tags

- [x] Acquire Release
- [x] Consume
- [x] Relaxed
- [x] Sequential Consistency

##### Basic

- [x] Locks, Guards & Mutexes
- [x] Semaphores
- [x] std scoped_lock Deadlock Prevention Algorithm
- [x] Threads

##### Composed

- [x] Condition Variables
- [x] Futures
- [x] Latches & Barriers
- [x] Promises & Packaged Task
- [x] std algorithm Execution Policies
- [x] std async

##### Coroutines

- [x] Async Computations with Coroutines
- [x] Coroutines
- [x] std generator
- [x] Value Sequence With Coroutine Generator

### Const

- [x] Const Correctness

### Containers

- [x] Container Choice & Complexity
- [x] Sequence Containers - array, deque, list
- [x] std span
- [x] std unordered_map & map
- [x] std vector

### Enums

- [x] Enum Class

### Exceptions

- [x] Data Structures & noexcept
- [x] Exceptions & Optimisation
- [x] Levels of Exceptions

### Files & Streams

- [x] File Reading & Writing
- [x] Filesystem
- [x] Streams

### Initialisation

- [x] Initialisation Syntax & Aggregates
- [x] Structured Bindings

### Iterators

- [x] Iterators & Iterator Categories

### Lambdas

- [x] Lambdas & Closures

### Low Latency

- [x] Low-Latency C++ Idioms

### Memory

- [x] Cache Aligned Structs
- [x] Custom Allocators
- [x] Memory APIs
- [x] Memory Manipulation Functions
- [x] Object Lifetime & RAII
- [x] PMR
- [x] std launder
- [x] Storage Durations
- [x] Storage Specifiers

### Namespaces

- [x] Inline Namespaces for Versioning
- [x] Unnamed Namespaces

### Numeric

- [x] IEEE 754
- [x] Integer Representation
- [x] Normalized & Subnormal Floating Point Numbers
- [x] Numerical Casting

### Operators

- [x] Operator Overloading
- [x] Three-Way Comparison (Spaceship)

### Patterns & Idioms

- [x] Pimpl
- [x] Singleton

### Polymorphism

- [x] C style unions
- [x] Dynamic Dispatch
- [x] Multiple & Virtual Inheritance
- [x] Runtime Polymorphism
- [x] std any
- [x] std variant
- [x] v-tables
- [x] Virtual Dispatch & Optimisation

### Ranges & Views

- [x] Constrained Algorithms
- [x] Custom Range Adaptors
- [x] Views & Range Adaptors

### Smart Pointers

- [x] Shared Pointer
- [x] std make_shared
- [x] std make_unique
- [x] Unique Pointer
- [x] Weak Pointer

### Strings

- [x] std string & SSO
- [x] std string_view

### Templates


#### Advanced

- [x] auto&& Keyword
- [x] decltype Operator
- [x] declval
- [x] Forwarding References
- [x] Template Recursion
- [x] Type Traits

#### Basics

- [x] Friendship With Templates
- [x] Introduction
- [x] Specialisation & Instantiation Types
- [x] Templates with Lambdas
- [x] Types of Templates

#### Concepts & Constraints

- [x] Concept Requirements
- [x] Concepts
- [x] Constraining Scenarios
- [x] enable_if
- [x] SFINAE
- [x] Type Constraints With constexpr
- [x] Type Constraints with void_t

#### Patterns & Idioms

- [x] CRTP In Composite Design Pattern
- [ ] CRTP
- [ ] Mixins
- [ ] Type Erasure
- [ ] TypeLists

#### Resolution & Deduction

- [ ] Class Template Deduction
- [ ] Function Template Deduction
- [ ] Name Binding & Dependent Names

#### Variadic Templates

- [ ] Ellipsis Operator
- [ ] Variadic Templates

### Testing

- [ ] Google Mock
- [ ] Google Test

### Time

- [ ] Clocks
- [ ] Duration
- [ ] Time Point

### Tooling

- [ ] ASAN
- [ ] Perf
- [ ] Tooling & Profilers
- [ ] TSAN Advanced
- [ ] TSAN
- [ ] UBSAN

### Type Casting

- [ ] Casting

### Undefined Behaviour

- [ ] Undefined Behaviour

## CPU

- [ ] Cache Coherency - MESI Protocol
- [ ] Cache Indexing, Tagging & Lookups
- [ ] CPU Architecture
- [ ] CPU Branch Prediction & OOO Execution
- [ ] CPU Caching
- [ ] CPU Pipelining & Super Scalar CPUs
- [ ] CPU Prefetching
- [ ] Hyperthreads
- [ ] Northbridge Architecture (Legacy)
- [ ] NUMA
- [ ] Set Associativity
- [ ] SRAM & DRAM
- [ ] Thread Affinity
- [ ] TLB
- [ ] Transactional Memory

## Databases

- [ ] BASE vs ACID
- [ ] Normalisation vs Denormalisation
- [ ] OLTP vs OLAP and Column Stores

### Indexing


#### Geospatial

- [ ] Geohashes
- [ ] Quadtrees
- [ ] R-Trees

#### Inverted Search

- [ ] Inverted Indexes

#### NoSQL

- [ ] LSM Trees
- [ ] Memtable
- [ ] SS Table
- [ ] WAL

#### SQL

- [ ] B-Trees
- [ ] Composite Indexes

### Isolation & Consistency

- [ ] Multi Version Concurrency Control
- [ ] Transaction Isolation Levels

### Modelling Types

- [ ] Document Based
- [ ] Graph
- [ ] Key-Value Stores
- [ ] Relational
- [ ] Wide Column

### Pagination

- [ ] Pagination

### Patterns

- [ ] Dealing with Contention
- [ ] Scaling Reads
- [ ] Scaling Writes

### Time Series Databases

- [ ] Internals

### Vector Databases

- [ ] 1. Fundamentals
- [ ] 2. Indexing & ANN Algorithms
- [ ] 3. Internals & Query Execution
- [ ] 4. Use Cases & Limitations

## Distributed Systems


### Broadcast

- [ ] Broadcast Algorithms
- [ ] Broadcast Protocols
- [ ] Commutativity In Broadcasting
- [ ] State Machine Replication via Broadcasting

### Clocks

- [ ] Clocks
- [ ] Logical Time & Lamport Clocks
- [ ] NTP
- [ ] Ordering & Causality
- [ ] Vector Clocks

### Communication

- [ ] Byzantine Generals Problem
- [ ] RPC
- [ ] Two Generals Problem

### Consensus

- [ ] Consensus
- [ ] Raft
- [ ] Two-Phase Commit

### Consistency

- [ ] Conflict Resolution
- [ ] Eventual Consistency
- [ ] Google's Spanner
- [ ] Linearizability

### Distributed Transactions

- [ ] Distributed Transactions - SAGA vs 2PC

### Replication & Fault Tolerance

- [ ] CAP Theorem
- [ ] Quorums
- [ ] Replication & State Inconsistency Resolution

## Misc

- [ ] Compiler Optimisations
- [ ] Instrinsics
- [ ] Multithreading Optimisations

## Networking


### Application Layer

- [ ] HTTP
- [ ] SSE
- [ ] WebRTC
- [ ] WebSockets

### Transport Layer

- [ ] Data Corruption
- [ ] Head Of Line Blocking
- [ ] Networking Layers

#### TCP

- [ ] Exponential Backoff
- [ ] Flow & Congestion Control
- [ ] Four Way Termination
- [ ] Handshaking
- [ ] Keep Alives
- [ ] Loss & Duplicate Detection
- [ ] Multiplexing
- [ ] Nagle's Algorithm
- [ ] Retransmissions & Timeout

#### TLS

- [ ] TLS With Protocols
- [ ] TLS

#### UDP

- [ ] QUIC
- [ ] UDP

## OS


### Concurrency

- [ ] 2-Phase Locking
- [ ] Concurrency Bugs
- [ ] Condition Variables
- [ ] Deadlocks
- [ ] Event Loops
- [ ] Futexes
- [ ] Hoare Semantics vs Mesa Semantics
- [ ] Interrupts
- [ ] Lock-free Data Structures
- [ ] Multiprocessor Scheduling
- [ ] Mutexes
- [ ] Priority Inheritance & Inversion
- [ ] pthread API
- [ ] Reader-Writer Locks
- [ ] Scheduling
- [ ] Semaphores
- [ ] Threads

### IO

- [ ] Device Interfaces
- [ ] Disk Scheduling Algorithms
- [ ] Hard Disk Drive
- [ ] Page Cache
- [ ] RAID
- [ ] SSDs FTL
- [ ] SSDs

### Isolation

- [ ] Context Switching
- [ ] Kernel Mode & User Mode
- [ ] Process
- [ ] System Calls
- [ ] Traps

### Linux Directory & File System

- [ ] Caching & Buffering
- [ ] Checksums In Recovering Corrupted Data
- [ ] Crash Consistency
- [ ] Disk Failure Modes
- [ ] Fast File System
- [ ] File System Organisation
- [ ] Flushing Writes To Disk
- [ ] Free Space Organisation
- [ ] Hard Links vs Soft Links
- [ ] Linux File Interface
- [ ] Log Structured File Systems
- [ ] Memory Mapping

### Optimizations

- [ ] Copy-On-Write (COW)
- [ ] Direct Memory Access or Direct Cache Access

### Security

- [ ] Security Threats

### Virtual Memory

- [ ] Buddy Allocator
- [ ] Fragmentation
- [ ] Free Space Management
- [ ] Linux Address Space
- [ ] Page Replacement Policies
- [ ] Page Swaps
- [ ] Page Tables Advanced
- [ ] Paging
- [ ] Seg Faults
- [ ] Segmentation
- [ ] Virtual Memory

## System Design

- [ ] Consistent Hashing
- [ ] Metric Cheatsheet

### APIs

- [ ] API Paradigms

### Caching

- [ ] Caching Strategies
- [ ] Eviction Policies
- [ ] Issues with Caching
- [ ] Types of Caching

### Consistency

- [ ] 2 Phase Locking
- [ ] SAGA Pattern

### Handling Failures

- [ ] Circuit Breakers
- [ ] Idempotency
- [ ] Timeouts and Backoffs

### Load Balancing

- [ ] Client-Side Load Balancing
- [ ] Dedicated Load Balancing
- [ ] Load Balancing Algorithms

### Low Latency

- [ ] Kernel Bypass
- [ ] Low-Latency Design Principles
- [ ] Tail Latency and Jitter
- [ ] Time Synchronization

### Observability

- [ ] Observability

### Patterns

- [ ] Handling Large Blobs
- [ ] Managing Long Running Tasks
- [ ] Transactional Outbox and CDC

#### Multi-step Processes

- [ ] Durable Execution Engines
- [ ] Event Sourcing
- [ ] Managed Workflow Systems

### Rate Limiting

- [ ] Rate Limiting Algorithms

### Regionalisation & Latency

- [ ] CDNs
- [ ] Regional Partitioning

### Security

- [ ] Authentication and Authorization

### Sharding

- [ ] Challenges of Sharding
- [ ] Sharding in Modern Databases
- [ ] Sharding Strategies

### Trading

- [ ] FIX Protocol
- [ ] Market Data Feeds
- [ ] Order Books and Matching Engines

## Technologies


### Caching

- [ ] Memcached
- [ ] Redis

### Cassandra

- [ ] Consistency
- [ ] Data Model & Primary Keys
- [ ] Gossip & Fault Tolerance
- [ ] Partitioning & Replication
- [ ] Query Routing
- [ ] Storage Model
- [ ] When to Use It & Limitations

### Databases

- [ ] ClickHouse
- [ ] DynamoDB
- [ ] kdb+
- [ ] MySQL
- [ ] PostgreSQL

### Leader Election

- [ ] etcd
- [ ] Zookeeper

### Queues

- [ ] Kafka
- [ ] RabbitMQ

### Search

- [ ] Elasticsearch
