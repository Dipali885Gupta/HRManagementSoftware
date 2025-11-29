# HRManagementSoftware

## Project Overview
This is a * HRManagementSoftware* built on *ABP Framework 9.3* (layered DDD architecture) with *.NET 9.0* backend and *Angular 20* frontend. The application provides Employee details,HR has the power to approve or reject the leave ,Based on the leave employee will getting payed,the leave request critiera.

### Context7 MCP Extension
This project uses the *Context7 MCP* extension for real-time library documentation:
- *VS Code Extension*: upstash.context7-mcp (already installed - see .vscode/extensions.json)
- *Usage*: Fetch up-to-date docs for ABP Framework, Angular, and external libraries
- *How to use*: Ask Copilot to retrieve documentation via Context7 for any library questions
### Reference Documentation Sources
- *ABP Framework*: https://abp.io/docs/latest

  
- *ABP Best Practices*: https://abp.io/docs/latest/framework/architecture/best-practices



*Why Domain Managers?*
- Centralized business rule validation (ABP best practice from https://abp.io/docs/latest/framework/architecture/best-practices/domain-services)
- Prevents invalid entity creation
- Consistent Guid generation via IGuidGenerator
- Makes entities testable and mockable

#### Entity Construction Rules (ABP Standards)
1. *Primary Constructor*: Must validate all inputs using Check.NotNull(), Check.Length()
2. *Parameterless Constructor*: Always protected for ORM compatibility
3. *Virtual Properties*: Mark all properties/methods as virtual (except private) for ORM proxying
4. *Private Setters*: Use for consistency protection, expose via business methods
### Configuration Management

#### Settings Structure
- *Domain.Shared*: Enums (QueryMode, SessionType, AIOperationType), constants
- *Infrastructure*: OpenRouterSettings (BaseUrl, Model, Timeout), AIProviderSettings (DefaultProvider, OperationSettings)
- *Secrets*: appsettings.secrets.json (local dev only), Azure Key Vault (production)

## Critical Developer Workflows

### First-Time Setup
powershell
# 1. Install ABP CLI client packages
abp install-libs

# 2. Run migrations to create database
dotnet run --project src/Triarch.CodeAdvisor.DbMigrator

# 3. Start backend
dotnet run --project src/Triarch.CodeAdvisor.HttpApi.Host

# 4. Start Angular (in separate terminal)
cd angular
npm install
npm start  # or: ng serve


### After Backend Changes
powershell
# Regenerate Angular service proxies (after DTO/controller changes)
abp generate-proxy -t ng -m Default -o angular

# Add new migration
Add-Migration YourMigrationName -Project Triarch.CodeAdvisor.EntityFrameworkCore
Update-Database -Project Triarch.CodeAdvisor.EntityFrameworkCore


### Testing Workflow
- *Unit tests*: Use TestBase with in-memory database
- *Integration tests*: Use EntityFrameworkCore.Tests project with SQLite
- *API testing*: AIServiceController has [AllowAnonymous] for development (remove for production)

## Project-Specific Conventions

### Naming Patterns
- *Entities*: Singular nouns (QuerySession, CodeQuery)
- *Repositories*: I{Entity}Repository (custom), IRepository<Entity, Guid> (ABP generic)
- *AppServices*: {Entity}AppService implementing I{Entity}AppService
- *DTOs*: {Entity}Dto, Create{Entity}Dto, Update{Entity}Dto
- *Managers*: {Entity}Manager (domain services)

### Frontend Patterns


#### Styling
- *Theme*: LeptonX (ABP commercial)
- *Overrides*: angular/src/custom-styles.scss (design system variables)
- *Mobile patterns*: Bottom sheets, offcanvas (see docs/frontend/mobile-button-pattern.md)

## Integration Points


### Database
- *Provider*: SQL Server (production), SQLite (tests)
- *Key tables*: TA_QuerySessions, TA_CodeQueries, TA_QueryResponses, TA_Jurisdictions
- *Migrations*: Located in EntityFrameworkCore/Migrations/


## ABP Best Practices to Follow
### Expections from copilot - 
Act as a senior ABP framework developer, Senior Full-Stack Developer and follow ABP best practices strictly. 
When generating code, ensure it adheres to ABP architecture guidelines for layered DDD applications.

### Core Principle: Leverage ABP Built-In Features First
*ALWAYS prefer ABP's built-in modules, base classes, interfaces, and methods over custom implementations.*

Before writing custom code, check if ABP provides:
- *Built-in base classes*: FullAuditedAggregateRoot, CreationAuditedEntity, AuditedEntity
- *Built-in properties*: CreationTime, CreatorId, LastModificationTime, DeletionTime (from audit interfaces)
- *Built-in services*: IGuidGenerator, ICurrentUser, IClock, IDataFilter
- *Built-in repositories*: IRepository<TEntity, TKey> with filtering, sorting, paging
- *Built-in modules*: Identity, Permission Management, Feature Management, Setting Management
- *Built-in attributes*: [Authorize], [DisableAuditing], [RemoteService]

### Entity Layer (Domain)
1. *Use Domain Managers for entity creation* - Ensures business rule validation (see QuerySessionManager)
2. *Inherit from ABP audit base classes* - Use FullAuditedAggregateRoot<Guid> for soft-delete and full audit tracking
3. *Leverage built-in audit properties* - Use CreationTime, CreatorId, LastModificationTime instead of custom date fields
4. *Virtual properties* - All properties must be virtual for ORM proxying (except private)
5. *Protected parameterless constructor* - Required for ORMs: protected QuerySession() { }
6. *Reference by ID only* - Cross-aggregate references use Guid IDs, never navigation properties
7. *Initialize collections* - Always initialize sub-collections in primary constructor
8. *Guid generation* - Never generate Guids in entity constructor, pass from manager using IGuidGenerator


### Domain Services
1. *Name with Manager suffix* - QuerySessionManager, CodeQueryManager
2. *No GET methods* - Domain services only mutate state, use repositories for queries
3. *Specific method names* - Use AssignToAsync(), not generic UpdateAsync()
4. *BusinessException for validation* - Throw with unique error codes (e.g., "IssueTracking:ConcurrentOpenIssueLimit")
5. *No DTO involvement* - Domain services work with domain objects only
6. *No CurrentUser logic* - Application layer passes user data as parameters

### Application Layer
1. *Use built-in ABP services* - Inject ICurrentUser, IClock, IGuidGenerator instead of custom implementations
2. *Use Domain Managers* - AppServices delegate entity creation to managers
3. *Authorization* - Apply [Authorize(CodeAdvisorPermissions.X)] attributes (ABP built-in)
4. *Unit of Work* - Implicit in ABP AppServices (auto-saves changes on method completion)
5. *DTO mapping* - Use ObjectMapper.Map<>() (AutoMapper configured by ABP)
6. *Localization* - Use L["{Key}"] for error messages and labels (ABP built-in)
7. *No direct repository mutations* - Use domain managers for create/update operations
8. *Filtering and sorting* - Use ABP's PagedAndSortedResultRequestDto, FilteredPagedAndSortedResultRequestDto
9. *Exception handling* - Use UserFriendlyException, BusinessException (ABP built-in) instead of generic exceptions
### Repository Layer
1. *Extend IRepository* - Use IRepository<TEntity, Guid> and add custom methods only when needed
2. *Use built-in LINQ methods* - ABP repositories support Where, FirstOrDefaultAsync, CountAsync
3. *Filter by audit properties* - Use CreationTime, CreatorId for date/user filtering (don't create custom fields)
4. *Soft-delete filtering* - ABP's IDataFilter<ISoftDelete> handles IsDeleted automatically
5. *Use WhereIf extension* - ABP provides WhereIf() for conditional filtering (don't write custom if/else)
6. *Include navigation properties* - Use WithDetailsAsync() or .Include() for eager loading

### Angular Frontend
1. *Use ABP Angular packages* - Leverage @abp/ng.core, @abp/ng.theme.shared modules
2. *Standalone components* - Use Angular 20 standalone pattern (no NgModule)
3. *ABP proxy services* - Generated in angular/src/app/proxy/ (DO NOT edit manually)
4. *Localization* - Use '::Menu:ArchAI' | abpLocalization pipe (ABP built-in)
5. *Page component* - Wrap main content in <abp-page> for consistent theming (ABP component)
6. *Permission checking* - Use ABP's *abpPermission directive instead of custom logic
7. *Service wrappers* - Wrap generated proxies for custom logic (see AiChatService wraps AIService)
8. *Use ABP ListService* - For pagination, sorting, filtering (extends PageQueryParams)
9. *Use ABP themes* - LeptonX provides layouts, toolbars, menus - don't recreate these
10. *Configuration* - Use ConfigStateService to access app configuration and settings


## ABP Framework Resources

### Built-In Services Reference
Always check these ABP built-in services before writing custom code:

#### Domain Layer Services
- *IGuidGenerator*: Generate sequential GUIDs (never use Guid.NewGuid())
- *IClock*: Get current time (use instead of DateTime.Now)
- *IDataSeeder*: Seed initial data
- *IDomainGuardService*: Domain-level business rule validation

#### Application Layer Services
- *ICurrentUser*: Access current user information (Id, UserName, Roles)
- *ICurrentTenant*: Multi-tenancy support
- *IAuthorizationService*: Check permissions programmatically
- *IObjectMapper*: Map between entities and DTOs (AutoMapper)
- *IStringLocalizer<T>* or *IHtmlLocalizer<T>*: Localization

#### Infrastructure Services
- *IRepository<TEntity, TKey>*: Generic repository with CRUD + LINQ
- *IDataFilter*: Enable/disable soft-delete, multi-tenancy filters
- *IDistributedCache*: Distributed caching (Redis, in-memory)
- *IEventBus*: Publish/subscribe events
- *IBackgroundJobManager*: Schedule background jobs

#### Common Extensions
- *.WhereIf(condition, predicate)*: Conditional LINQ filtering
- *.PageBy(skipCount, maxResultCount)*: Pagination helper
- *.OrderBy(sorting)*: Dynamic sorting from string

### Built-In Base Classes
Use these instead of plain classes or custom base implementations:

#### Entity Base Classes
- *Entity<TKey>*: Basic entity with Id
- *AggregateRoot<TKey>*: Root entity for aggregate pattern
- *CreationAuditedEntity<TKey>*: Adds CreationTime, CreatorId
- *AuditedEntity<TKey>*: Adds modification tracking
- *FullAuditedEntity<TKey>*: Adds soft-delete support
- *FullAudite- *FullAuditedAggregateRoot<TKey>*: Complete audit + aggregate root (RECOMMENDED)

#### Application Service Base Classes
- *ApplicationService*: Base for all app services (includes ObjectMapper, L[], etc.)
- *CrudAppService<TEntity, TEntityDto, TKey>*: Auto CRUD operations
- *AbstractKeyCrudAppService<...>*: CRUD with custom key type

#### DTO Base Classes
- *EntityDto<TKey>*: Basic DTO with Id
- *AuditedEntityDto<TKey>*: Includes audit fields
- *FullAuditedEntityDto<TKey>*: Includes soft-delete fields
- *PagedAndSortedResultRequestDto*: For list queries with paging/sorting
- *PagedResultDto<T>*: For paginated responses

### Official Documentation
- *Best Practices Index*: https://abp.io/docs/latest/framework/architecture/best-practices
- *Entity Design*: https://abp.io/docs/latest/framework/architecture/best-practices/entities
- *Domain Services*: https://abp.io/docs/latest/framework/architecture/best-practices/domain-services
- *Application Services*: https://abp.io/docs/latest/framework/architecture/best-practices/application-services
- *DDD Overview*: https://abp.io/docs/latest/framework/architecture/domain-driven-design
- *Built-In Services*: https://abp.io/docs/latest/framework/infrastructure/dependency-injection

### Context7 Integration
When you need up-to-date ABP documentation:
1. Ask Copilot to use Context7 MCP extension
2. Request specific library docs: /abpframework/abp for ABP Framework
3. Focus on specific topics: "entities", "domain services", "application services"

### Video Tutorials
- *Entities*: https://abp.io/video-courses/essentials/entities
- *Domain Services*: https://abp.io/video-courses/essentials/domain-services

## Debugging Tips
- *Proxy generation fails*: Ensure backend is running, DTOs are in *.Contracts project
- *Database issues*: Run DbMigrator console app, check ConnectionStrings in appsettings
- *Angular build errors*: Run abp install-libs if ABP packages missing

---

*When uncertain, reference*:
- ABP Framework docs: https://abp.io/docs/latest
- Existing patterns in Application/, Infrastructure/, Domain/ layers